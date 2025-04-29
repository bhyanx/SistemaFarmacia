import React from 'react';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { formatDate } from '../../../shared/utils/formatDate';

const VentaItem = ({ venta, onEdit, onDelete }) => {
  return (
    <tr className="border-b">
      <td className="p-2">{venta.VentaID}</td>
      <td className="p-2">{venta.ClienteID}</td>
      <td className="p-2">{formatCurrency(venta.Total)}</td>
      <td className="p-2">{venta.MetodoPago}</td>
      <td className="p-2">{venta.Estado}</td>
      <td className="p-2">{formatDate(venta.created_at)}</td>
      <td className="p-2">
        <button
          onClick={() => onEdit(venta)}
          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(venta.VentaID)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default VentaItem;