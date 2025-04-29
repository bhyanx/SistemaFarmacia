import { formatCurrency } from '../../../shared/utils/formatCurrency';

const DetalleCompraItem = ({ detalle, onEdit, onDelete }) => {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="py-3 px-6">{detalle.DetalleCompraID}</td>
      <td className="py-3 px-6">{detalle.CompraID}</td>
      <td className="py-3 px-6">{detalle.ProductoID}</td>
      <td className="py-3 px-6">{detalle.Cantidad}</td>
      <td className="py-3 px-6">{formatCurrency(detalle.PrecioUnitario)}</td>
      <td className="py-3 px-6">{formatCurrency(detalle.Subtotal)}</td>
      <td className="py-3 px-6 text-center">
        <button
          onClick={() => onEdit(detalle.DetalleCompraID)}
          className="text-blue-500 hover:text-blue-700 mr-4"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(detalle.DetalleCompraID)}
          className="text-red-500 hover:text-red-700"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default DetalleCompraItem;