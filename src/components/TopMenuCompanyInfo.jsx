import Button from "./ButtonComponent";

export default function TopMenuCompanyInfo() {
  const saveCompanyInfo = () => {
    const name = document.getElementById("company-name").value;
    const code = document.getElementById("company-code").value;
    const email = document.getElementById("company-email").value;
    const phone = document.getElementById("company-phone").value;
    const address = document.getElementById("company-address").value;
    const city = document.getElementById("company-city").value;
    const country = document.getElementById("company-country").value;
    window.api.sendCompanyInfo([
      name,
      code,
      email,
      phone,
      address,
      city,
      country,
    ]);
  };

  const restartCompanyInfo = () => {
    document.getElementById("company-name").value = "";
    document.getElementById("company-code").value = "";
    document.getElementById("company-email").value = "";
    document.getElementById("company-phone").value = "";
    document.getElementById("company-address").value = "";
    document.getElementById("company-city").value = "";
    document.getElementById("company-country").value = "";
    window.api.sendCompanyInfo(["", "", "", "", ""]);
  };

  return (
    <div className="bg-sky-400 w-full shadow-md h-16 flex flex-row justify-start px-4">
      <h1 className="w-full self-center text-lg font-bold">Empresa</h1>
      <div className="flex flex-row justify-end">
        <Button funcion={saveCompanyInfo}>Guardar</Button>
        <Button funcion={restartCompanyInfo}>Reiniciar</Button>
      </div>
    </div>
  );
}
