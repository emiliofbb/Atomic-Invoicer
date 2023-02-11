import Button from "./ButtonComponent";

export default function TopMenuInvoice() {
  const exportInvoice = () => {
    console.log("exported");
  };

  const restartInvoice = () => {
    document.getElementById("costumer-name").value = "";
    document.getElementById("costumer-address").value = "";

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
      <h1 className="w-full self-center text-lg font-bold">New Invoice</h1>
      <div className="flex flex-row justify-end">
        <Button funcion={exportInvoice}>Export</Button>
        <Button funcion={restartInvoice}>Restart</Button>
      </div>
    </div>
  );
}
