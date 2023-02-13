import Button from "./ButtonComponent";

export default function ProductForm({ selectedRow, setSelectedRow }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addProduct = (e) => {
    const name = document.getElementById("product-name").value;
    const quantity = document.getElementById("product-quantity").value;
    const price = document.getElementById("product-price").value;

    if (name === "" || quantity === "" || price === "") {
      return;
    }

    const classes = "border border-gray-800";
    const table = document.getElementById("product-table");
    const lastRow = table.lastChild;
    var nextId = 0;
    if (lastRow !== null) {
      nextId = parseInt(lastRow.id) + 1;
    }

    const nextRow = document.createElement("tr");
    nextRow.id = nextId;

    const nameElem = document.createElement("td");
    const quantityElem = document.createElement("td");
    const priceElem = document.createElement("td");

    nameElem.textContent = name;
    quantityElem.textContent = quantity;
    priceElem.textContent = price;

    nameElem.className = classes;
    quantityElem.className = classes;
    priceElem.className = classes;

    nextRow.appendChild(nameElem);
    nextRow.appendChild(quantityElem);
    nextRow.appendChild(priceElem);
    nextRow.className = "focus:bg-gray-700";

    nextRow.addEventListener("click", (ev) => {
      setSelectedRow(nextId);
      document.getElementById("product-name").value = name;
      document.getElementById("product-quantity").value = quantity;
      document.getElementById("product-price").value = price;
    });
    table.appendChild(nextRow);

    document.getElementById("product-name").value = "";
    document.getElementById("product-quantity").value = "";
    document.getElementById("product-price").value = "";
  };

  const modifyProduct = (e) => {
    if (selectedRow === -1) {
      return;
    }
    const row = document.getElementById(selectedRow);
    const childs = row.childNodes;
    childs[0].textContent = document.getElementById("product-name").value;
    childs[1].textContent = document.getElementById("product-quantity").value;
    childs[2].textContent = document.getElementById("product-price").value;
  };

  const deleteProduct = (e) => {
    if (selectedRow === -1) {
      return;
    }
    const val = document.getElementById(selectedRow);
    val.remove();
    document.getElementById("product-name").value = "";
    document.getElementById("product-quantity").value = "";
    document.getElementById("product-price").value = "";
    setSelectedRow(-1);
  };

  return (
    <form className="py-2 px-6" onSubmit={handleSubmit}>
      <span className="text-xl font-bold">Lista de Productos</span>
      <div className="flex flex-row w-full mb-2 mt-3">
        <label className="w-1/3 mr-1">
          <span className="text-gray-700">Nombre del Producto</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="Producto sin nombre"
            id="product-name"
          />
        </label>
        <label className="w-1/3 mr-1">
          <span className="text-gray-700">Cantidad</span>
          <input
            className="form-input text-right rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="number"
            placeholder="1"
            id="product-quantity"
          />
        </label>
        <label className="w-1/3 mr-1">
          <span className="text-gray-700">Precio Unitario</span>
          <input
            className="form-input text-right rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="number"
            placeholder="58,50"
            id="product-price"
          />
        </label>
      </div>
      <div className="flex flex-row w-full mb-2 mt-3">
        <label className="w-1/3 mr-1 flex flex-row justify-center">
          <Button funcion={addProduct}>Añadir Producto</Button>
        </label>
        <label className="w-1/3 mr-1 flex flex flex-row justify-center">
          <Button funcion={modifyProduct}>Modificar Producto</Button>
        </label>
        <label className="w-1/3 mr-1 flex flex-row justify-center">
          <Button funcion={deleteProduct}>Eliminar Producto</Button>
        </label>
      </div>
    </form>
  );
}
