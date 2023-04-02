import { app, BrowserWindow, ipcMain, dialog } from "electron";
import fs from "fs";
import path from "path";
import currency from "currency.js";
let cheerio = require("cheerio");
const puppeteer = require("puppeteer");

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

function createAddress(address, city, country) {
  var addressTotal = address;

  if (city !== "" && country !== "") {
    addressTotal = addressTotal + ", <br/>" + city + ", " + country;
  }
  if (city === "" && country !== "") {
    addressTotal = addressTotal + ", <br/>" + country;
  }
  if (country === "" && city !== "") {
    addressTotal = addressTotal + ", <br/>" + city;
  }

  return addressTotal;
}

async function createPDF(html, path) {
  // Create a browser instance
  const browser = await puppeteer.launch();

  // Create a new page
  const page = await browser.newPage();

  //Get HTML content from HTML
  await page.setContent(html, { waitUntil: "domcontentloaded" });

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType("screen");

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: path,
    margin: { top: "10px", right: "50px", bottom: "10px", left: "50px" },
    printBackground: true,
    format: "A4",
  });

  // Close the browser instance
  await browser.close();
}

async function generateInvoice(event, args) {
  const companyInfo = getCompanyInfoWithLogo();
  const docType = args[0];
  const customer = args[1];
  const products = args[2];

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const invoiceName = customer.company + dd + mm + yyyy + ".pdf";

  const htmlString = fs.readFileSync(
    path.join(app.getAppPath(), "./dist/invoices/index.html"),
    "utf-8"
  );

  const $ = cheerio.load(htmlString);

  $("#doc-type").text(docType);

  // Company info insert

  const addressTotal = createAddress(
    companyInfo.address,
    companyInfo.city,
    companyInfo.country
  );
  $("#logo-img").attr("src", `data:image/jgp;base64,${companyInfo.logoBase64}`);
  $("#company-name").text(companyInfo.name);
  $("#company-address").append(addressTotal);
  $("#company-tel").text(companyInfo.phone);
  $("#company-mail").text(companyInfo.email);
  $("#company-mail").attr("href", "mailto:" + companyInfo.email);

  //Customer info insert
  const finalCustomerAddress = createAddress(
    customer.address,
    customer.city,
    customer.country
  );
  $("#client-name").append("<span>CLIENTE:</span> " + customer.company);
  $("#client-address").append(
    "<span>DIRECCIÓN:</span> " + finalCustomerAddress
  );
  $("#emision-date").append(
    "<span>FECHA:</span> " + dd + "/" + mm + "/" + yyyy
  );

  const currencyOptions = { symbol: "€", decimal: ",", separator: "." };

  var subtotal = currency(0, currencyOptions);

  //PRODS info insert
  products.forEach((prod, i) => {
    const unitPrice = currency(prod.price, currencyOptions);
    const prodPrice = unitPrice.multiply(prod.quantity);
    subtotal = subtotal.add(prodPrice);
    const row = `<tr>
      <td class="service">${i}</td>
      <td class="desc">
        ${prod.description}
      </td>
      <td class="unit">${unitPrice.format()}</td>
      <td class="qty">${prod.quantity}</td>
      <td class="total">${prodPrice.format()}</td>
  </tr>`;
    $("#row-nt").before(row);
  });

  const taxValue = subtotal.multiply(0.21);
  $("#total-no-tax").text(subtotal.format());
  $("#tax-val").text(taxValue.format());
  $("#total-final").text(subtotal.add(taxValue).format());

  await createPDF($.html(), invoiceName);
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
