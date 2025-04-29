import CompraItem from './compraItem';
const CompraList = ({ compras, onEdit, onDelete }) => {
  if (!compras || compras.length === 0) {
    return <p className="text-center text-gray-600">No hay compras registradas.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Proveedor</th>
            <th className="py-3 px-4 text-left">Fecha Compra</th>
            <th className="py-3 px-4 text-left">Fecha Entrega</th>
            <th className="py-3 px-4 text-left">Total</th>
            <th className="py-3 px-4 text-left">Estado</th>
            <th className="py-3 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {compras.map((compra) => (
            <CompraItem
              key={compra.CompraID}
              compra={compra}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompraList;