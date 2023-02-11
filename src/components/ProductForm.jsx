import Button from "./ButtonComponent";

export default function ProductForm({ selectedRow }) {
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

    const classes = "border border-slate-400";
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

    table.appendChild(nextRow);

    document.getElementById("product-name").value = "";
    document.getElementById("product-quantity").value = "";
    document.getElementById("product-price").value = "";
  };

  const modifyProduct = (e) => {
    console.log("Modify jisjis");
  };

  const deleteProduct = (e) => {
    console.log("Delete jesjes");
  };

  return (
    <form className="py-2 px-6" onSubmit={handleSubmit}>
      <span className="text-xl font-bold">Products List</span>
      <div className="flex flex-row w-full mb-2 mt-3">
        <label className="w-1/3 mr-1">
          <span className="text-gray-700">Product Name</span>
          <input
            className="form-input rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="Oak Table"
            id="product-name"
          />
        </label>
        <label className="w-1/3 mr-1">
          <span className="text-gray-700">Product Quantity</span>
          <input
            className="form-input text-right rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="1"
            id="product-quantity"
          />
        </label>
        <label className="w-1/3 mr-1">
          <span className="text-gray-700">Product Price</span>
          <input
            className="form-input text-right rounded-lg block border-gray-300 shadow-sm focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50 w-full"
            type="text"
            placeholder="58.50"
            id="product-price"
          />
        </label>
      </div>
      <div className="flex flex-row w-full mb-2 mt-3">
        <label className="w-1/3 mr-1">
          <Button funcion={addProduct}>Add Product</Button>
        </label>
        <label className="w-1/3 mr-1">
          <Button funcion={modifyProduct}>Modify Product</Button>
        </label>
        <label className="w-1/3 mr-1">
          <Button funcion={deleteProduct}>Delete Product</Button>
        </label>
      </div>
    </form>
  );
}
