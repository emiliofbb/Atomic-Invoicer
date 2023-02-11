export default function Button({ children, funcion }) {
  return (
    <button
      className="font-mono h-10 bg-gray-800 text-white px-6 rounded-lg shadow-sm shadow-gray-700 mx-2 my-3 hover:bg-neutral-700 hover:shadow-gray-400 hover:shadow-md"
      onClick={funcion}
    >
      {children}
    </button>
  );
}
