'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import {window, commands, Disposable, ExtensionContext, StatusBarAlignment, StatusBarItem,
    TextDocument, workspace} from 'vscode';
import {exec, ExecOptions} from 'child_process';  

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "Editors" is now active!');

    let editors = new Editors(context);
    let controller = new EditorsController(editors);
    editors.load();

    context.subscriptions.push(editors);
    context.subscriptions.push(controller);
}

class Editors {
    private _statusBarItems: StatusBarItem[];
    private _editors: any[];
    private _context: ExtensionContext;
    
    constructor(context: ExtensionContext) {
        this._context = context;
    }
    
    public load() {        
        console.log("Editors.load()");
        let config = workspace.getConfiguration();
        if (config.has("editors.list")) {
            this._editors = config.get("editors.list", []);
            console.log(this._editors);
            this._editors.forEach(editor => {
                var name = editor["name"];
                var cmd = editor["command"];
                var label = editor["label"];
                
                let disposable = commands.registerCommand("extension.openInExternalEditor_" + name, () => {                    
                    //window.activeTextEditor.document.save();
                    //window.showInformationMessage("starting: " + cmd)
                    // exec command, options, callback
                    console.log(window.activeTextEditor.document.fileName);
                    let file = window.activeTextEditor.document.fileName;
                    var child = exec(`"${cmd}" "${file}"`);
                    child.stdout.on('data', (data) => {
                        window.showInformationMessage(data);
                    });
                });                
                
                this._context.subscriptions.push(disposable);

                var statusBarItem = window.createStatusBarItem(StatusBarAlignment.Left);
                statusBarItem.text = label;
                statusBarItem.command = "extension.openInExternalEditor_" + name;
                statusBarItem.show();
                
            })
        }
    }
    
    public update() {
        console.log("Editors.update()");
        let editor = window.activeTextEditor;
        
        if (!editor) {
            this._statusBarItems.forEach(element => {
                element.hide();
            })
            return;
        }
    }

    public dispose() {
        console.log("Editors.dispose()");
        this._statusBarItems.forEach(element => {
            element.dispose();
        });        
    }
}

class EditorsController {
    private _editors: Editors;
    private _disposable: Disposable;
    
    constructor(editors: Editors) {
        this._editors = editors;
        this._editors.update();
        
        let subscriptions: Disposable[] = [];
        window.onDidChangeActiveTextEditor(this._onChangeEvent, this, subscriptions);
        window.onDidChangeTextEditorOptions(this._onOptionsEvent, this, subscriptions);
        
        this._editors.update();
        this._disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

    private _onChangeEvent() {
        this._editors.update();
    }

    private _onOptionsEvent() {
        this._editors.load();
    }
}
