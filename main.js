const electron = require('electron')
const {app, BrowserWindow} = require('electron')
  let win
  const Menu = electron.Menu;
  function createWindow () {
    win = new BrowserWindow({width: 1024, height: 768, frame: false, icon: __dirname +  './img/logo.png'})
    const menuTemplate = [
        {
            label: 'Tùy chọn',
            submenu: [
                {
                    label: 'Về VinaGo',
                    click(){
                        openAboutWindow();
                    },
                },
                {
                    label: 'Thoát',
                    role: 'quit'
                },
              ],
        },
        {
            label: 'Công cụ cho nhà phát triển',
            role: 'toggleDevTools'
        },
        {
            label: 'Toàn màn hình',
            role: 'toggleFullScreen'
        }
    ];
     let newWindow

     function openAboutWindow() {
      if (newWindow) {
       newWindow.focus()
       return;
     }

     newWindow = new BrowserWindow({
      icon: __dirname +  './img/logo.png',
      height: 550,
      width: 550,
      title: "Về VinaGo",
      minimizable: false,
      maximizable: false,
      fullscreenable: false
     });
     newWindow.setMenu(null);
     newWindow.loadURL(__dirname + './about.html');

      newWindow.on('closed', function () {
      newWindow = null;
     });
    };
    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
    win.loadFile('index.html');
    win.on('closed', () => {
      win = null
    })
  }
  app.on('ready', createWindow)
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })
