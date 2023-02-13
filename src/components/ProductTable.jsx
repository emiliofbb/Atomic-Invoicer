export default function ProductTable() {
  return (
    <table className="w-full border border-slate-400 border-collapse table-fixed mb-6">
      <thead>
        <tr id="header">
          <th className="border border-gray-800">Nombre</th>
          <th className="border border-gray-800">Cantidad</th>
          <th className="border border-gray-800">Precio</th>
        </tr>
      </thead>
      <tbody id="product-table"></tbody>
    </table>
  );
}
