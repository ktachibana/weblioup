const electron = require('electron');
const app = electron.app;
const globalShortcut = electron.globalShortcut;
const clipboard = electron.clipboard;
const dialog = app.dialog;
const exec = require('child_process').exec;

const keybind = 'Cmd+Shift+Space';

app.on('ready', () => {
  var ret = globalShortcut.register(keybind, () => {
    const keyword = clipboard.readText();
    if(keyword && 256 < keyword.length) {
      console.log('Error: 256 < keyword');
      return;
    }
    exec('open http://ejje.weblio.jp/content/' + encodeURIComponent(keyword));
  });

  if (!ret) {
    console.log('registration failed');
  }
});

app.on('will-quit', function() {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll();
});
