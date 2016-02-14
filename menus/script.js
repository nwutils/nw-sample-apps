var gui = require('nw.gui');

// Extend application menu for Mac OS
if (process.platform == "darwin") {
  var menu = new gui.Menu({type: "menubar"});
  menu.createMacBuiltin && menu.createMacBuiltin(window.document.title);
  gui.Window.get().menu = menu;
}

gui.Window.get().show();
/**
 * Create context menus (right click) on DOM elements
 */
var menu1 = new gui.Menu();
var submenu = new gui.Menu();
submenu.append(new gui.MenuItem({ type: 'checkbox', label: 'box1' }));
submenu.append(new gui.MenuItem({ type: 'checkbox', label: 'box2' }));
submenu.append(new gui.MenuItem({ type: 'checkbox', label: 'box3' }));
submenu.append(new gui.MenuItem({ type: 'checkbox', label: 'box4' }));
menu1.append(new gui.MenuItem({ icon: 'imgs/cut.png', label: 'Cut' }));
menu1.append(new gui.MenuItem({ icon: 'imgs/edit.png', label: 'Edit' }));
menu1.append(new gui.MenuItem({ icon: 'imgs/email.png', label: 'Email' }));
menu1.append(new gui.MenuItem({ icon: 'imgs/play.png', label: 'Play' }));
menu1.append(new gui.MenuItem({ icon: 'imgs/tick.png', label: 'Tick' }));
menu1.append(new gui.MenuItem({ type: 'separator' }));
menu1.append(new gui.MenuItem({ icon: 'imgs/disk.png', label: 'Disk', submenu: submenu }));

var menu2 = new gui.Menu();
menu2.append(new gui.MenuItem({ type: 'checkbox', label: 'Apple' }));
menu2.append(new gui.MenuItem({ type: 'checkbox', label: 'Banana' }));
menu2.append(new gui.MenuItem({ type: 'checkbox', label: 'Strawberry' }));
menu2.append(new gui.MenuItem({ type: 'checkbox', label: 'Pear' }));
menu2.append(new gui.MenuItem({ type: 'separator' }));
var info_item = new gui.MenuItem({ label: 'Which Fruit Do I Love?' });
menu2.append(info_item);
var lastone = null;
function flip() {
  if (lastone) {
    lastone.checked = false;
    lastone.enabled = true;
  }
  lastone = this;
  this.enabled = false;
  info_item.label = 'I Love ' + this.label;
}
for (var i = 0; i < 4; ++i)
  menu2.items[i].click = flip;

var menu3 = new gui.Menu();
var colors = [ '#000000', '#FF0000', '#00FF00' , '#0000FF', '#FFFF00', '#00FFFF', '#FF00FF', '#C0C0C0', '#FFFFFF' ];
function changecolor() {
  document.getElementById('area-3').style.backgroundColor = this.label;
}
for (var i = 0; i < colors.length; i++) {
  menu3.append(new gui.MenuItem({ label: colors[i], click: changecolor }));
};

document.getElementById('area-1').addEventListener('contextmenu', function(ev) { 
  ev.preventDefault();
  menu1.popup(ev.x, ev.y);
  return false;
});

document.getElementById('area-2').addEventListener('contextmenu', function(ev) { 
  ev.preventDefault();
  menu2.popup(ev.x, ev.y);
  return false;
});

document.getElementById('area-3').addEventListener('contextmenu', function(ev) { 
  ev.preventDefault();
  menu3.popup(ev.x, ev.y);
  return false;
});
