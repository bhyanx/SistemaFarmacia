import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as detalleVentaService from '../../services/detalleVentaService';
import DetalleVentaItem from './DetalleVentaItem';
import Loading from '../../../shared/components/Loading';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

const DetalleVentaList = () => {
  const { ventaId } = useParams(); // Obtiene VentaID de la URL, si existe
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        setLoading(true);
        let data;
        if (ventaId) {
          // Obtiene detalles para una venta específica
          data = await detalleVentaService.getDetallesByVenta(ventaId);
        } else {
          // Obtiene todos los detalles
          data = await detalleVentaService.getDetalles();
        }
        setDetalles(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los detalles de ventas');
      } finally {
        setLoading(false);
      }
    };

    fetchDetalles();
  }, [ventaId]);

  const handleEdit = (id) => {
    navigate(`/admin/detalle-ventas/editar/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este detalle de venta?')) {
      try {
        await detalleVentaService.deleteDetalle(id);
        setDetalles(detalles.filter((detalle) => detalle.DetalleVentaID !== id));
      } catch (err) {
        setError(err.message || 'Error al eliminar el detalle de venta');
      }
    }
  };

  const handleAddNew = () => {
    navigate(`/admin/detalle-ventas/nuevo${ventaId ? `/${ventaId}` : ''}`);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {ventaId ? `Detalles de la Venta #${ventaId}` : 'Todos los Detalles de Ventas'}
      </h2>
      <button
        onClick={handleAddNew}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Agregar Nuevo Detalle
      </button>
      {detalles.length === 0 ? (
        <p className="text-gray-600">No hay detalles de ventas registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Venta ID</th>
                <th className="py-3 px-6 text-left">Producto ID</th>
                <th className="py-3 px-6 text-left">Cantidad</th>
                <th className="py-3 px-6 text-left">Precio Unitario</th>
                <th className="py-3 px-6 text-left">Subtotal</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle) => (
                <DetalleVentaItem
                  key={detalle.DetalleVentaID}
                  detalle={detalle}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DetalleVentaList;