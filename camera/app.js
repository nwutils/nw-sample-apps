var gui = require('nw.gui');

// Extend application menu for Mac OS
if (process.platform == "darwin") {
  var menu = new gui.Menu({type: "menubar"});
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
  gui.Window.get().menu = menu;
}

navigator.webkitGetUserMedia({video: true},
  function(stream) {
    document.getElementById('camera').src = URL.createObjectURL(stream);
  },
  function() {
    alert('could not connect stream');
  }
);

gui.Window.get().show();
