import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { formatDate } from '../../../shared/utils/formatDate';

const CompraItem = ({ compra, onEdit, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">{compra.CompraID}</td>
      <td className="py-3 px-4">{compra.ProveedorID}</td>
      <td className="py-3 px-4">{formatDate(compra.FechaCompra)}</td>
      <td className="py-3 px-4">{formatDate(compra.FechaEntrega)}</td>
      <td className="py-3 px-4">{formatCurrency(compra.Total)}</td>
      <td className="py-3 px-4">{compra.Estado}</td>
      <td className="py-3 px-4 flex gap-2">
        <button
          onClick={() => onEdit(compra)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(compra.CompraID)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default CompraItem;