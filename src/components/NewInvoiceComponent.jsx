import TopMenuInvoice from "./TopMenuInvoice";

export default function NewInvoiceComponent() {
  return (
    <div className="w-full">
      <TopMenuInvoice />
      <div className="mt-4 ml-8 mr-4">
        <h1 className="text-3xl font-semibold font-sans antialiased">
          New Invoice window
        </h1>
      </div>
    </div>
  );
}
