# Better Tray Menu

## Overview
Starts the application silently (in the tray). The main window can be opened by clicking the tray.

## Running
```
git clone https://github.com/jpl42/Better-Tray-Menu.git
nw nw-sample-apps/Better-Tray-Menu/
```

## Disable Frameless Window
Change `frame` to `true` in `package.json`. Remove anything relating to `window-button`, `exit-button` and `minimize-button` in the files `main/index.html`, `main/style.css` and `main/script.js`.

## APIs
* [Tray](https://github.com/nwjs/nw.js/wiki/Tray)
* [Window](https://github.com/nwjs/nw.js/wiki/Window)
