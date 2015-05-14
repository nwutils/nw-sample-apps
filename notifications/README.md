## Notifications example

Sample appication for NW.js Notification API, also include examples using external libraries

**How to run:**

```
git clone git@github.com:zcbenz/nw-sample-apps.git
nw nw-sample-apps/notifications
```

**How to set your icon for OS X:**

```
cd nw-sample-apps/notifications
npm install nw
touch node_modules/nw/nwjs/nwjs.app
touch node_modules/nw/nwjs/nwjs.app/Contents/Info.plist
./node_modules/.bin/nw --mac_plist ./mac_files/app.plist --mac_icon ./mac_files/app.icns
```

## APIs

* [Notification](https://github.com/nwjs/nw.js/wiki/Notification)

## Extras

* [node-notifier](https://github.com/mikaelbr/node-notifier)
* [nw-notify](https://www.npmjs.com/package/nw-notify)

