import { useEffect } from "react";
import Button from "./ButtonComponent";

export default function CompanyForm() {
  useEffect(() => {
    window.api.getCompanyInfo().then((result) => {
      if (result !== undefined) {
        document.getElementById("company-name").value =
          result.name === undefined ? "" : result.name;
        document.getElementById("company-code").value =
          result.code === undefined ? "" : result.code;
        document.getElementById("company-email").value =
          result.email === undefined ? "" : result.email;
        document.getElementById("company-phone").value =
          result.phone === undefined ? "" : result.phone;
        document.getElementById("company-address").value =
          result.address === undefined ? "" : result.address;
        document.getElementById("company-city").value =
          result.city === undefined ? "" : result.city;
        document.getElementById("company-country").value =
          result.country === undefined ? "" : result.country;
        if (result.logoBase64 !== "" && result.logoBase64 !== undefined) {
          const img = document.getElementById("logoImg");
          img.src = `data:image/jgp;base64,${result.logoBase64}`;
        }
      }
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const selectLogo = () => {
    window.api.selectLogoPath([]).then((result) => {
      if (result !== "") {
        const img = document.getElementById("logoImg");
        img.src = `data:image/jgp;base64,${result}`;
      }
    });
  };

  return (
    <form id="company-form" className="px-4 py-2" onSubmit={handleSubmit}>
      <div className="flex flex-row w-full mb-4 items-center">
        <span className="text-gray-700">Logo</span>
      </div>
      <div className="flex flex-row w-full mb-4">
        <img id="logoImg" src="notFileN" className="h-16 mr-8" />
        <Button funcion={selectLogo}>Seleccione un Logo</Button>
      </div>
      <div className="flex flex-row w-full mb-4">
        <label className="w-1/2 mr-1">
          <span className="text-gray-700">Nombre</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="Informatic TICAS S.L"
            id="company-name"
          />
        </label>
        <label className="w-1/2 ml-1">
          <span className="text-gray-700">Código</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="12345678A"
            id="company-code"
          />
        </label>
      </div>
      <div className="flex flex-row w-full mb-4">
        <label className="w-1/2 mr-1">
          <span className="text-gray-700">Email</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="ticas@ticgal.gal"
            id="company-email"
          />
        </label>
        <label className="w-1/2 ml-1">
          <span className="text-gray-700">Teléfono</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="tel"
            placeholder="987987987"
            id="company-phone"
          />
        </label>
      </div>
      <label className="block mb-4">
        <span className="text-gray-700">Dirección</span>
        <input
          className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
          type="text"
          placeholder="Plaza de Galicia n51"
          id="company-address"
        />
      </label>
      <div className="flex flex-row w-full mb-4">
        <label className="w-1/2 mr-1">
          <span className="text-gray-700">Ciudad</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="Santiago de Compostela"
            id="company-city"
          />
        </label>
        <label className="w-1/2 ml-1">
          <span className="text-gray-700">País</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="España"
            id="company-country"
          />
        </label>
      </div>
    </form>
  );
}
