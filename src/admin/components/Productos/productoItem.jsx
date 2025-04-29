import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { formatDate } from '../../../shared/utils/formatDate';

const ProductoItem = ({ producto, onEdit, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-4">{producto.ProductoID}</td>
      <td className="py-3 px-4">{producto.Nombre}</td>
      <td className="py-3 px-4">{producto.NombreGenerico}</td>
      <td className="py-3 px-4">{producto.Categoria}</td>
      <td className="py-3 px-4">{producto.StockActual}</td>
      <td className="py-3 px-4">{formatCurrency(producto.PrecioUnitario)}</td>
      <td className="py-3 px-4">{formatDate(producto.FechaVencimiento)}</td>
      <td className="py-3 px-4 flex gap-2">
        <button
          onClick={() => onEdit(producto)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(producto.ProductoID)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ProductoItem;