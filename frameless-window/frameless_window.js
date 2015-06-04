var gui = require("nw.gui");

// Extend application menu for Mac OS
if (process.platform == "darwin") {
  var menu = new gui.Menu({type: "menubar"});
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
  gui.Window.get().menu = menu;
}

function updateCheckbox() {
  var top_checkbox = document.getElementById("top-box");
  var bottom_checkbox = document.getElementById("bottom-box");
  var left_checkbox = document.getElementById("left-box");
  var right_checkbox = document.getElementById("right-box");
  if (top_checkbox.checked || bottom_checkbox.checked) {
    left_checkbox.disabled = true;
    right_checkbox.disabled = true;
  } else if (left_checkbox.checked || right_checkbox.checked) {
    top_checkbox.disabled = true;
    bottom_checkbox.disabled = true;
  } else {
    left_checkbox.disabled = false;
    right_checkbox.disabled = false;
    top_checkbox.disabled = false;
    bottom_checkbox.disabled = false;
  }
}

function initCheckbox(checkboxId, titlebar_name, titlebar_icon_url, titlebar_text) {
  var elem = document.getElementById(checkboxId);
  if (!elem)
    return;
  elem.onclick = function() {
    if (document.getElementById(checkboxId).checked)
      addTitlebar(titlebar_name, titlebar_icon_url, titlebar_text);
    else
      removeTitlebar(titlebar_name);
    focusTitlebars(true);

    updateContentStyle();
    updateCheckbox();
  }
}

window.onfocus = function() { 
  console.log("focus");
  focusTitlebars(true);
};

window.onblur = function() { 
  console.log("blur");
  focusTitlebars(false);
};

window.onresize = function() {
  updateContentStyle();
};

window.onload = function() {

  initCheckbox("top-box", "top-titlebar", "top-titlebar.png", "Top Titlebar");
  initCheckbox("bottom-box", "bottom-titlebar", "bottom-titlebar.png", "Bottom Titlebar");
  initCheckbox("left-box", "left-titlebar", "left-titlebar.png", "Left Titlebar");
  initCheckbox("right-box", "right-titlebar", "right-titlebar.png", "Right Titlebar");

  document.getElementById("close-window-button").onclick = function() {
    window.close();
  };

  document.querySelector('#minimize-window-button').onclick = function () {
    gui.Window.get().minimize();
  };

  document.querySelector('#maximize-window-button').onclick = function () {
    gui.Window.get().maximize();
  };

  document.querySelector('#open-inspector-button').onclick = function () {
    var win = gui.Window.get();
    if (win.isDevToolsOpen()) {
      win.closeDevTools();
      this.innerText = "Open Developer Tools";
    } else {
      win.showDevTools();
      this.innerText = "Close Developer Tools";
    }
  };

  updateContentStyle();
  gui.Window.get().show();
};
