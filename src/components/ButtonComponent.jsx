export default function Button({ children, funcion }) {
  return (
    <button
      className="font-mono bg-gray-800 text-white px-6 rounded-lg shadow-sm shadow-gray-700 mx-2 my-3"
      onClick={funcion}
    >
      {children}
    </button>
  );
}
