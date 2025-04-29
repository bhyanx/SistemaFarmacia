import React, { useState, useEffect } from 'react';
import { getVentas } from '../../services/ventaService';
import VentaItem from './VentaItem';
import Loading from '../../../shared/components/Loading';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const VentaList = ({ onEdit, refresh }) => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const data = await getVentas();
        setVentas(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar las ventas');
        setLoading(false);
      }
    };
    fetchVentas();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta venta?')) {
      try {
        await deleteVenta(id);
        setVentas(ventas.filter((venta) => venta.VentaID !== id));
      } catch (err) {
        setError(err.message || 'Error al eliminar la venta');
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Cliente ID</th>
            <th className="p-2 text-left">Total</th>
            <th className="p-2 text-left">Método de Pago</th>
            <th className="p-2 text-left">Estado</th>
            <th className="p-2 text-left">Fecha</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-2 text-center text-gray-600">
                No hay ventas registradas.
              </td>
            </tr>
          ) : (
            ventas.map((venta) => (
              <VentaItem
                key={venta.VentaID}
                venta={venta}
                onEdit={onEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VentaList;