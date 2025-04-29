import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductoById } from '../../services/productoService';
import { CartContext } from '../../../shared/context/CartContext';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import { formatDate } from '../../../shared/utils/formatDate';
import Loading from '../../../shared/components/Loading';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import placeholder from '../../../assets/images/placeholder.jpg';

const ProductoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await getProductoById(id);
        setProducto(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar el producto');
        setLoading(false);
      }
    };
    fetchProducto();
  }, [id]);

  const handleAddToCart = () => {
    if (producto) {
      addToCart({ ...producto, quantity: 1 });
      navigate('/client/carrito');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!producto) return <p className="text-center text-gray-600">Producto no encontrado.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={producto.imagen || placeholder}
          alt={producto.Nombre}
          className="w-full md:w-1/2 h-64 object-cover rounded"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">{producto.Nombre}</h2>
          <p className="text-gray-600 mt-2">Genérico: {producto.NombreGenerico}</p>
          <p className="text-gray-600">Categoría: {producto.Categoria}</p>
          <p className="text-lg font-bold text-blue-600 mt-4">
            {formatCurrency(producto.PrecioUnitario)}
          </p>
          <p className="text-gray-600 mt-2">Stock disponible: {producto.StockActual}</p>
          <p className="text-gray-600">Vencimiento: {formatDate(producto.FechaVencimiento)}</p>
          <p className="text-gray-600">Lote: {producto.Lote}</p>
          <p className="text-gray-600">Ubicación: {producto.Ubicacion}</p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition"
              disabled={producto.StockActual === 0}
            >
              Añadir al Carrito
            </button>
            <button
              onClick={() => navigate('/client/productos')}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
            >
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetail;