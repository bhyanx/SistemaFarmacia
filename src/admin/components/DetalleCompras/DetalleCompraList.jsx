import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as detalleCompraService from '../../services/detalleCompraService';
import DetalleCompraItem from './DetalleCompraItem';
import Loading from '../../../shared/components/Loading';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

const DetalleCompraList = () => {
  const { compraId } = useParams(); // Obtiene CompraID de la URL, si existe
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        setLoading(true);
        let data;
        if (compraId) {
          // Obtiene detalles para una compra específica
          data = await detalleCompraService.getDetallesByCompra(compraId);
        } else {
          // Obtiene todos los detalles
          data = await detalleCompraService.getDetalles();
        }
        setDetalles(data);
      } catch (err) {
        setError(err.message || 'Error al cargar los detalles de compras');
      } finally {
        setLoading(false);
      }
    };

    fetchDetalles();
  }, [compraId]);

  const handleEdit = (id) => {
    navigate(`/admin/detalle-compras/editar/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este detalle de compra?')) {
      try {
        await detalleCompraService.deleteDetalle(id);
        setDetalles(detalles.filter((detalle) => detalle.DetalleCompraID !== id));
      } catch (err) {
        setError(err.message || 'Error al eliminar el detalle de compra');
      }
    }
  };

  const handleAddNew = () => {
    navigate(`/admin/detalle-compras/nuevo${compraId ? `/${compraId}` : ''}`);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {compraId ? `Detalles de la Compra #${compraId}` : 'Todos los Detalles de Compras'}
      </h2>
      <button
        onClick={handleAddNew}
        className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Agregar Nuevo Detalle
      </button>
      {detalles.length === 0 ? (
        <p className="text-gray-600">No hay detalles de compras registrados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Compra ID</th>
                <th className="py-3 px-6 text-left">Producto ID</th>
                <th className="py-3 px-6 text-left">Cantidad</th>
                <th className="py-3 px-6 text-left">Precio Unitario</th>
                <th className="py-3 px-6 text-left">Subtotal</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((detalle) => (
                <DetalleCompraItem
                  key={detalle.DetalleCompraID}
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

export default DetalleCompraList;