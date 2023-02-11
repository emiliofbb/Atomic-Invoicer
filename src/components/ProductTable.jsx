export default function ProductTable() {
  return (
    <table className="w-full border border-slate-400 border-collapse table-fixed mb-6">
      <thead>
        <tr id="header">
          <th className="border border-slate-400">Name</th>
          <th className="border border-slate-400">Quantity</th>
          <th className="border border-slate-400">Price</th>
        </tr>
      </thead>
      <tbody id="product-table"></tbody>
    </table>
  );
}
