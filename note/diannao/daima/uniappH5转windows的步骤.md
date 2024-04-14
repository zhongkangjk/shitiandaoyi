---
title: uniappH5转windows的步骤
categories:
  - 计算机
  - 前端
tags:
  - 前端
  - uniapp
date: 2022-03-08 14:58:30
---
如标题
<!-- more -->
#### 安装nodejs

#### 安装electron（主程序）

```
npm install electron -g
```

#### 安装electron-packager（打包用）

```
npm install electron-packager -g
```

#### uniapp的manifest.json修改

根目录下的manifest.json-h5配置

运行的基础路径修改为：

```
./
```

不然打包出来会出现白屏，读取不到，因为打包出来的h5默认加载地址为/static/

```
去掉启用https协议
```

不然会出现网络无法加载，去掉https不影响你请求后端的https协议。

#### h5打包

HbuilderX顶部菜单栏-发布-h5手机版发行-发行

发现的默认目录为：unpackage\dist\build\h5

#### 新建文件

```
复制代码你的项目目录/
├── static
└── index.html
```

#### 新建package.json和main.js

```
复制代码新建后项目目录/
├── static
├── package.json
├── main.js
└── index.html
```

#### 在 package.json 中添加如下内容

```
复制代码
{
  "name"    : "app-name",
  "version" : "0.1.0",
  "main"    : "main.js"
}
```

#### 在 main.js 中添加下面的内容，这个 main.js 文件就是上面 package.json 中的 "main"键 的值，所以可根据需要修改

```js
const {app, BrowserWindow,Menu} = require('electron')
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
	Menu.setApplicationMenu(null) //取消菜单栏
  // Create the browser window.
  win = new BrowserWindow({width: 375, height: 667})

  // and load the index.html of the app.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
```
具体参考electron官网文档
如果你的网页首页的文件名不是 “index.html”，那么请在 main.js 中将其中的 'index.html' 修改为你的网页首页名

##### 更新内容后再次使用HbuilderX生成h5前记得备份 package.json main.js

#### 打包

```bash
复制代码electron-packager . 可执行文件的文件名 --win --out 打包成的文件夹名 --arch=x64位还是32位 --electron-version版本号(不是你的h5版本号，是electron版本号) --overwrite --ignore=node_modules
```

#### 示例（可直接复制下面代码）：

```bash
electron-packager . lan --win --out lan --arch=x64 --electron-version 17.1.0 --overwrite --ignore=node_modules --icon=2.ico
```
