import TopMenuInvoice from "./TopMenuInvoice";
import ClientForm from "./ClientFormComponent";
import ProductForm from "./ProductForm";
import { useState } from "react";
import ProductTable from "./ProductTable";

export default function NewInvoiceComponent() {
  const [selectedRowId, setSelectedRowId] = useState(-1);

  return (
    <div style={{ overflow: "auto" }} className="w-full h-screen">
      <TopMenuInvoice />
      <div className="py-2 px-6">
        <label className="text-xl font-bold">Tipo de documento</label>
        <br />
        <select id="docType" className="mt-2">
          <option value="1">Factura</option>
          <option value="2">Presupuesto</option>
        </select>
      </div>
      <ClientForm />
      <ProductForm
        selectedRow={selectedRowId}
        setSelectedRow={setSelectedRowId}
      />
      <div className="px-4">
        <ProductTable />
      </div>
    </div>
  );
}
