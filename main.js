import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs from "fs";
import path from "path";

const Store = require("electron-store");
var easyinvoice = require("easyinvoice");

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
    city: args[5],
    country: args[6],
  };
  store.set("company-info", companyInfo);
}

function getCompanyInfoWithLogo() {
  const companyInfo = store.get("company-info");
  if (companyInfo.logoPath !== undefined && companyInfo.logoPath !== "") {
    companyInfo.logoBase64 = fs
      .readFileSync(companyInfo.logoPath)
      .toString("base64");
  }

  return companyInfo;
}

function getCompanyInfo(event, args) {
  return getCompanyInfoWithLogo();
}

async function handleLogoSelection(event, args) {
  const rest = await dialog
    .showOpenDialog({
      title: "Select a Logo",
      properties: ["openFile"],
      filters: [{ name: "Images", extensions: ["jpg", "png"] }],
    })
    .then((result) => {
      if (result.filePaths.length === 0 || result.canceled) {
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

async function generateInvoice(event, args) {
  const companyInfo = getCompanyInfoWithLogo();
  const customer = args[0];
  const products = args[1];
  var data = {
    client: customer,
    sender: {
      company: companyInfo.name,
      address: companyInfo.address,
      zip: "CIF: " + companyInfo.code,
      country: companyInfo.country,
      city: companyInfo.city,
      custom1: "Teléfono: " + companyInfo.phone,
      custom2: "Email: " + companyInfo.email,
    },
    images: {
      logo: companyInfo.logoBase64,
    },
    information: {
      date: new Date().toLocaleDateString("es-ES"),
      number: "1",
    },
    products: products,
    bottomNotice: "Firma del cliente",
    settings: {
      currency: "EUR",
      "tax-notation": "IVA",
      locale: "de-DE",
    },
    translate: {
      invoice: "Factura",
      number: "Número",
      date: "Fecha",
      "due-date": "Fecha de vencimiento",
      products: "Productos",
      quantity: "Cantidad",
      price: "Precio",
    },
  };
  const result = await easyinvoice.createInvoice(data);
  fs.writeFileSync("invoice.pdf", result.pdf, "base64");
}

app.whenReady().then(() => {
  ipcMain.on("company-info", handleSaveCompanyInfo);
  ipcMain.on("create-invoice", generateInvoice);
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
