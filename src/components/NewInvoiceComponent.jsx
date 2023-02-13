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
