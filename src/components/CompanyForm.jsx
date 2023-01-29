export default function CompanyForm() {
  return (
    <form
      id="company-form"
      className="border-gray-800 border-2 rounded-lg px-4 py-2"
    >
      <div className="flex flex-row w-full mb-4">
        <label className="w-1/2 mr-1">
          <span className="text-gray-700">Company name</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="Informatic TICAS S.L"
          />
        </label>
        <label className="w-1/2 ml-1">
          <span className="text-gray-700">Company Code</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="tel"
            placeholder="12345678A"
          />
        </label>
      </div>
      <div className="flex flex-row w-full mb-4">
        <label className="w-1/2 mr-1">
          <span className="text-gray-700">Company email</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="ticas@ticgal.gal"
          />
        </label>
        <label className="w-1/2 ml-1">
          <span className="text-gray-700">Company telephone</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="tel"
            placeholder="987987987"
          />
        </label>
      </div>
      <label className="block mb-4">
        <span className="text-gray-700">Company address</span>
        <input
          className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
          type="text"
          placeholder="Galicia Square n51, 15888 Santiago de Compostela"
        />
      </label>
      {/**Todo: componay logo button selector */}
    </form>
  );
}
