export default function ClientForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="py-2 px-6" onSubmit={handleSubmit}>
      <span className="text-xl font-bold">Información del Cliente</span>
      <div className="flex flex-row w-full mb-2 mt-3">
        <label className="w-full">
          <span className="text-gray-700">Nombre del Cliente</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="Manolo Calvo"
            id="customer-name"
          />
        </label>
      </div>
      <div className="flex flex-row w-full mb-4">
        <label className="w-full">
          <span className="text-gray-700">Dirección del Cliente</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="Calle del Loco n66"
            id="customer-address"
          />
        </label>
      </div>
      <div className="flex flex-row w-full mb-4">
        <label className="w-1/2 mr-1">
          <span className="text-gray-700">Ciudad</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="Santiago de Compostela"
            id="customer-city"
          />
        </label>
        <label className="w-1/2 ml-1">
          <span className="text-gray-700">País</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="España"
            id="customer-country"
          />
        </label>
      </div>
    </form>
  );
}
