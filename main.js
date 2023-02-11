import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs from "fs";
import path from "path";

const Store = require("electron-store");

const store = new Store();

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false;

function createWindow() {
  // Create the main Electron window

  const win = new BrowserWindow({
    width: 800,

    height: 600,

    webPreferences: {
      contextIsolation: true,
      preload: IS_DEV
        ? path.join(app.getAppPath(), "./public/preload.js")
        : path.join(app.getAppPath(), "./dist/preload.js"),
    },
  });

  win.menuBarVisible = false;
  win.autoHideMenuBar = false;

  if (IS_DEV) {
    // If we are in development mode we load content from localhost server - vite

    // and open the developer tools

    win.loadURL("http://localhost:5173");

    win.webContents.openDevTools();
  } else {
    // In all other cases, load the index.html file from the dist folder

    win.loadURL(`file://${path.join(__dirname, "..", "dist", "index.html")}`);
    win.webContents.openDevTools();
  }
}

function handleSaveCompanyInfo(event, args) {
  const companyInfo = {
    name: args[0],
    code: args[1],
    email: args[2],
    phone: args[3],
    address: args[4],
  };
  store.set("company-info", companyInfo);
}

function getCompanyInfo(event, args) {
  const companyInfo = store.get("company-info");
  if (companyInfo.logoPath !== undefined && companyInfo.logoPath !== "") {
    companyInfo.logoBase64 = fs
      .readFileSync(companyInfo.logoPath)
      .toString("base64");
  }
  return companyInfo;
}

async function handleLogoSelection(event, args) {
  const rest = await dialog
    .showOpenDialog({
      title: "Select a Logo",
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["jpg", "png"] }],
    })
    .then((result) => {
      if (result.filePaths.length === 0) {
        return "";
      } else {
        return result.filePaths[0];
      }
    });

  if (rest === "") {
    return "";
  }
  var companyInfo = store.get("company-info");
  companyInfo.logoPath = rest;
  store.set("company-info", companyInfo);
  return fs.readFileSync(rest).toString("base64");
}

app.whenReady().then(() => {
  ipcMain.on("company-info", handleSaveCompanyInfo);
  ipcMain.handle("get-company-info", getCompanyInfo);
  ipcMain.handle("select-logo", handleLogoSelection);
  createWindow();
});

app.on("window-all-closed", () => {
  // On macOS, it's common for an app and its menu bar to remain

  // active until the user shuts down the application via the Cmd + Q shortcut

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS, if an application is in the dock, it is common for a window to be created after

  // clicking on the icon in the dock if there are no windows active

  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
