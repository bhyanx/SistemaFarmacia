import React, { useState, useEffect } from 'react';
import { getVentasByCliente } from '../../services/ventaService';
import VentaItem from './VentaItem';
import Loading from '../../../shared/components/Loading';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const VentaList = ({ clienteId }) => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const data = await getVentasByCliente(clienteId);
        setVentas(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar las ventas');
        setLoading(false);
      }
    };
    fetchVentas();
  }, [clienteId]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Historial de Ventas</h2>
      {ventas.length === 0 ? (
        <p className="text-gray-600">No hay ventas registradas.</p>
      ) : (
        <div className="grid gap-4">
          {ventas.map((venta) => (
            <VentaItem key={venta.VentaID} venta={venta} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VentaList;