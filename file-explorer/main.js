global.$ = $;

var abar = require('address_bar');
var folder_view = require('folder_view');
var nwGui = require('nw.gui');

// append default actions to menu for OSX
var initMenu = function () {
  try {
    var nwGui = require('nw.gui');
    var nativeMenuBar = new nwGui.Menu({type: "menubar"});
    if (process.platform == "darwin") {
      nativeMenuBar.createMacBuiltin && nativeMenuBar.createMacBuiltin("FileExplorer");
    }
    nwGui.Window.get().menu = nativeMenuBar;
  } catch (error) {
    console.error(error);
    setTimeout(function () { throw error }, 1);
  }
};

var App = {
  // show "about" window
  about: function () {
    var params = {toolbar: false, resizable: false, show: true, height: 120, width: 350};
    var aboutWindow = nwGui.Window.open('about.html', params);
    aboutWindow.on('document-end', function() {
      aboutWindow.focus();
      // open link in default browser
      $(aboutWindow.window.document).find('a').bind('click', function (e) {
        e.preventDefault();
        nwGui.Shell.openExternal(this.href);
      });
    });
  },

  // change folder for sidebar links
  cd: function (anchor) {
    anchor = $(anchor);

    $('#sidebar li').removeClass('active');
    $('#sidebar i').removeClass('icon-white');

    anchor.closest('li').addClass('active');
    anchor.find('i').addClass('icon-white');

    this.setPath(anchor.attr('nw-path'));
  },

  // set path for file explorer
  setPath: function (path) {
    if (path.indexOf('~') == 0) {
      path = path.replace('~', process.env['HOME']);
    }
    this.folder.open(path);
    this.addressbar.set(path);
  }
};

$(document).ready(function() {
  initMenu();

  var folder = new folder_view.Folder($('#files'));
  var addressbar = new abar.AddressBar($('#addressbar'));

  folder.open(process.cwd());
  addressbar.set(process.cwd());

  App.folder = folder;
  App.addressbar = addressbar;

  folder.on('navigate', function(dir, mime) {
    if (mime.type == 'folder') {
      addressbar.enter(mime);
    } else {
      nwGui.Shell.openItem(mime.path);
    }
  });

  addressbar.on('navigate', function(dir) {
    folder.open(dir);
  });

  // sidebar favorites
  $('[nw-path]').bind('click', function (event) {
    event.preventDefault();
    App.cd(this);
  });
});
