import Button from "./ButtonComponent";

export default function TopMenuCompanyInfo() {
  const saveCompanyInfo = () => {
    console.log("Saved");
  };

  const restartCompanyInfo = () => {
    console.log("Restarted company info");
  };

  return (
    <div className="bg-sky-400 w-full shadow-md h-16 flex flex-row justify-start px-4">
      <h1 className="w-full self-center text-lg font-bold">Company Info</h1>
      <div className="flex flex-row justify-end">
        <Button funcion={saveCompanyInfo}>Save</Button>
        <Button funcion={restartCompanyInfo}>Restart</Button>
      </div>
    </div>
  );
}
