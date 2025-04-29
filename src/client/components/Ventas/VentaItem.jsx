import React from 'react';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { formatDate } from '../../../shared/utils/formatDate';

const VentaItem = ({ venta }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold">Venta #{venta.VentaID}</h3>
      <p className="text-gray-600">Fecha: {formatDate(venta.created_at)}</p>
      <p className="text-gray-600">Total: {formatCurrency(venta.Total)}</p>
      <p className="text-gray-600">Método de Pago: {venta.MetodoPago}</p>
      <p className="text-gray-600">Estado: {venta.Estado}</p>
    </div>
  );
};

export default VentaItem;