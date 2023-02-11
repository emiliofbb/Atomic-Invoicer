const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("api", {
  getCompanyInfo: (args) => ipcRenderer.invoke("get-company-info", args),

  selectLogoPath: (args) => ipcRenderer.invoke("select-logo", args),

  sendCompanyInfo: (args) => ipcRenderer.send("company-info", args),

  testReceive: (callback) =>
    ipcRenderer.on("test-receive", (event, data) => {
      callback(data);
    }),
});
