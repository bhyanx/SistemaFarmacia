import React from 'react';

const ClienteItem = ({ cliente, onEdit, onDelete }) => {
  return (
    <tr className="border-b">
      <td className="p-2">{cliente.ClienteID}</td>
      <td className="p-2">{cliente.Nombre}</td>
      <td className="p-2">{cliente.DNI}</td>
      <td className="p-2">{cliente.Telefono || '-'}</td>
      <td className="p-2">{cliente.Email || '-'}</td>
      <td className="p-2">{cliente.HistorialMedico || '-'}</td>
      <td className="p-2">
        <button
          onClick={() => onEdit(cliente)}
          className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(cliente.ClienteID)}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default ClienteItem;
