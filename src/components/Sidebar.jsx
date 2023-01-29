export default function Sidebar({ selectOptioner, idRender }) {
  const changeColorSelected = (elementSelected) => {
    const options = document.querySelectorAll('[is-option="true"]');
    options.forEach((element) => {
      element.style.color = "white";
    });
    elementSelected.style.color = "#67e8f9";
  };

  const newInvoice = (e) => {
    changeColorSelected(e.target);

    selectOptioner(2);
  };

  const companyInfo = (e) => {
    changeColorSelected(e.target);

    selectOptioner(1);
  };

  const startInfoPage = (e) => {
    changeColorSelected(e.target);

    selectOptioner(0);
  };

  return (
    <aside className="bg-cyan-900 flex flex-col h-screen w-1/4 max-w-[250px] items-center rounded-br-xl shadow-xl shadow-black">
      <div className="mt-4 text-lg font-mono">
        <button
          is-option="true"
          className="bg-gray-800 px-4 py-1 rounded-md text-white w-full shadow-lg shadow-cyan-700"
          onClick={startInfoPage}
        >
          Atomic Invoicer
        </button>
      </div>
      <span className="mt-6 bg-cyan-300 w-full h-px"></span>
      <div className="mt-6 flex flex-col items-center text-base font-mono">
        <button
          is-option="true"
          className="mb-6 text-white underline"
          onClick={companyInfo}
        >
          Company information
        </button>
        <button
          is-option="true"
          className="text-white underline"
          onClick={newInvoice}
        >
          New Invoice!!!
        </button>
      </div>
    </aside>
  );
}