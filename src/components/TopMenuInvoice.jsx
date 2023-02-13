import Button from "./ButtonComponent";

export default function TopMenuInvoice() {
  const exportInvoice = () => {
    const data = [];
    const customer = {};
    const products = [];
    customer.company = document.getElementById("customer-name").value;
    customer.address = document.getElementById("customer-address").value;
    customer.city = document.getElementById("customer-city").value;
    customer.country = document.getElementById("customer-country").value;

    data.push(customer);

    const tableValues = document.getElementById("product-table");
    tableValues.childNodes.forEach((element) => {
      const cols = element.childNodes;
      const prod = {};
      prod.description = cols[0].textContent;
      prod.quantity = cols[1].textContent;
      prod.price = cols[2].textContent;
      prod["tax-rate"] = 21;
      products.push(prod);
    });

    data.push(products);

    window.api.createInvoice(data);
  };

  const restartInvoice = () => {
    document.getElementById("customer-name").value = "";
    document.getElementById("customer-address").value = "";
    document.getElementById("customer-city").value = "";
    document.getElementById("customer-country").value = "";

    document.getElementById("product-name").value = "";
    document.getElementById("product-quantity").value = "";
    document.getElementById("product-price").value = "";

    const table = document.getElementById("product-table");

    while (table.firstChild !== null) {
      table.firstChild.remove();
    }
  };

  return (
    <div className="bg-sky-400 w-full shadow-md h-16 flex flex-row justify-start px-4">
      <h1 className="w-full self-center text-lg font-bold">Nuevo Documento</h1>
      <div className="flex flex-row justify-end">
        <Button funcion={exportInvoice}>Exportar</Button>
        <Button funcion={restartInvoice}>Reiniciar</Button>
      </div>
    </div>
  );
}
