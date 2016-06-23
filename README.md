# editors README

I like playing around with Visual Studio Code (VSCode). I think it's a decient editor, but sometimes I wish I was using Sublime Text for another extension or feature I have installed.

Opening Sublime and opening the same file wasn't much fun. So I created this extension.

## Features

Editors allows you to configure VSCode to open the current open file in another editor of your choosing. You can configure as many as you want. Examples below show you how to add Notepad++, Sublime and Brackets.

Each editor configured gets a button in the status bar. I've thought about allowing a quick command "Ctrl+Shift+P" menu, but haven't gotten around to it yet.

## Requirements

You will need to add configuration items for each editor you would like to use.

## Extension Settings

There is no hard limit to the number of editors you can configure, but you could run out of space on the status bar (hence the quick command option)

This extension contributes the following settings:

* `editors.list`: a list of objects that contain the name, label and command for each editor

For example:

```json
    "editors.list": [
        {"name": "notepadPlusPlus", "label": "$(file-text) np++", "command":"C:\\Program Files (x86)\\Notepad++\\notepad++.exe"},
        {"name": "sublimeText3", "label": "$(pencil) subl", "command":"C:\\Program Files\\Sublime Text 3\\sublime_text.exe"},
        {"name": "brackets", "label": "$(browser) bkt", "command": "C:\\Program Files (x86)\\Brackets\\Brackets.exe"}              
    ]
```

The name is currently only used in the registerCommand function so it has to be a valid JavaScript variable name

## Known Issues

None that I'm aware of, use the Issues tab if you find one. I have not tested it on any platform other than Windows, but there isn't any platform specific code.

## Release Notes

### 0.0.1

Initial release of editors

-----------------------------------------------------------------------------------------------------------

**Enjoy!**