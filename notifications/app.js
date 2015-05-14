var NW = require('nw.gui');

if (process.platform == "darwin") {
  var menu = new NW.Menu({type: "menubar"});
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
  NW.Window.get().menu = menu;
}

var $ = function (selector) {
  return document.querySelector(selector);
}

document.addEventListener('DOMContentLoaded', function() {

  $('#simple-coffee').addEventListener('click', function (event) {
    showNotification("./icons/coffee.png", "Your coffee", 'is ready...')
  });

  $('#simple-camera').addEventListener('click', function (event) {
    var notif = showNotification("./icons/camera.png", "Camera", 'example notification');
    setTimeout(function () {
      notif.close();
    }, 1200);
  });

  $('#simple-car').addEventListener('click', function (event) {
    showNotification('./icons/car.png', "Taxi is arrived", 'hurry up');
  });

  $('#node-notifier-coffee').addEventListener('click', function (event) {
    showNativeNotification("./icons/coffee.png", "Your coffee", 'is ready...', 'default')
  });

  $('#node-notifier-camera').addEventListener('click', function (event) {
    showNativeNotification("./icons/camera.png", "Camera", 'example notification', 'Glass');
  });

  $('#node-notifier-car').addEventListener('click', function (event) {
    showNativeNotification(false, "Taxi is arrived", 'hurry up', false, './icons/car.png');
  });

  $('#nw-notify-coffee').addEventListener('click', function (event) {
    showHtmlNotification("./icons/coffee.png", "Your coffee", 'is ready...');
  });

  $('#nw-notify-camera').addEventListener('click', function (event) {
    showHtmlNotification("./icons/camera.png", "Camera", 'example notification', 'Glass');
  });

  $('#nw-notify-car').addEventListener('click', function (event) {
    showHtmlNotification('./icons/car.png', "Taxi is arrived", 'hurry up');
  });

  NW.Window.get().focus();

  // for nw-notify frameless windows
  NW.Window.get().on('close', function() {
    process.exit(0);
  });
});

var writeLog = function (msg) {
  var logElement = $("#output");
  logElement.innerHTML += msg + "<br>";
  logElement.scrollTop = logElement.scrollHeight
}

var showNotification = function (icon, title, body) {
  if (icon && icon.match(/^\./)) {
    icon = icon.replace('.', 'file://' + process.cwd());
  }

  var notification = new Notification(title, {icon: icon, body: body});

  notification.onclick = function () {
    writeLog("Notification clicked");
  };

  notification.onclose = function () {
    writeLog("Notification closed");
    NW.Window.get().focus();
  };

  notification.onshow = function () {
    writeLog("-----<br>" + title);
  };

  return notification;
}

var showNativeNotification = function (icon, title, message, sound, image) {
  var notifier;
  try {
    notifier = require('node-notifier');
  } catch (error) {
    console.error(error);
    if (error.message == "Cannot find module 'node-notifier'") {
      window.alert("Can not load module 'node-notifier'.\nPlease run 'npm install'");
    }
    return false;
  }

  var path = require('path');

  icon = icon ? path.join(process.cwd(), icon) : undefined;
  image = image ? path.join(process.cwd(), image) : undefined;

  notifier.notify({
    title: title,
    message: message,
    icon: icon,
    appIcon: icon,
    contentImage: image,
    sound: sound,
    wait: false,
    sender: 'org.nwjs.sample.notifications'
  }, function (err, response) {
    if (response == "Activate\n") {
      writeLog("node-notifier: notification clicked");
      NW.Window.get().focus();
    }
  });

  writeLog("-----<br>node-notifier: " + title);
};

var showHtmlNotification = function (icon, title, body) {
  var notifier;
  try {
    notifier = require('nw-notify');
  } catch (error) {
    console.error(error);
    if (error.message == "Cannot find module 'nw-notify'") {
      window.alert("Can not load module 'nw-notify'.\nPlease run 'npm install'");
      return false;
    }
  }

  // give it nice look
  notifier.setConfig({
    defaultStyleContainer: {
      border: '1px solid #9D9D9D',
      borderRadius: '6px',
      backgroundColor: 'rgba(245, 245, 245, 0.94)',
      fontFamily: 'Helvetica Neue',
      boxShadow: '0px 0px 11px rgba(0, 0, 0, 0.4)',
      fontSize: 12,
      position: 'relative',
      lineHeight: '17px',
      padding: '8px 12px 8px 14px'
    }
  });

  var callback = function () {
    writeLog("nw-notify notification clicked");
  };

  if (icon) icon = notifier.getAppPath() + icon;
  notifier.notify(title, body, false, icon, callback);

  writeLog("-----<br>nw-notify: " + title);
};
