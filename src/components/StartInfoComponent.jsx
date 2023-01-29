export default function StartInfoComponent() {
  return (
    <div className="w-full">
      <div className="mt-4 ml-8 mr-4 ">
        <h1 className="text-3xl font-semibold font-sans antialiased">
          What is Atomic Invoicer?
        </h1>
        <p className="mt-6">
          Atomic Invoicer is a open source invoice generator. It uses React for
          frontend, tailwindcss for styles and electron to contain the React app
          into a desktop aplication.
        </p>
      </div>
    </div>
  );
}
