var gui = require('nw.gui');
var win = gui.Window.get();

$("#exit-button").click( function() {
	win.close(); 
});

$("#minimize-button").click( function() {
	win.minimize();
});