export default function ClientForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="py-2 px-6" onSubmit={handleSubmit}>
      <span className="text-xl font-bold">Costumer Info</span>
      <div className="flex flex-row w-full mb-2 mt-3">
        <label className="w-full">
          <span className="text-gray-700">Costumer Name</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="Manolo Calvo"
            id="costumer-name"
          />
        </label>
      </div>
      <div className="flex flex-row w-full mb-4">
        <label className="w-full">
          <span className="text-gray-700">Costumer Address</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="tel"
            placeholder="Raimons Street 16, Lugo"
            id="costumer-address"
          />
        </label>
      </div>
    </form>
  );
}
