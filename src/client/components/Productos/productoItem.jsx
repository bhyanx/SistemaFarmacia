import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../../shared/context/CartContext';
import { formatCurrency } from '../../../shared/utils/formatCurrency';
import placeholder from '../../../assets/images/placeholder.jpg';

const ProductoItem = ({ producto }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const handleViewDetails = () => {
    navigate(`/client/productos/${producto.ProductoID}`);
  };

  const handleAddToCart = () => {
    addToCart({ ...producto, quantity: 1 });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={producto.imagen || placeholder}
        alt={producto.Nombre}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{producto.Nombre}</h3>
        <p className="text-sm text-gray-600">{producto.NombreGenerico}</p>
        <p className="text-lg font-bold text-blue-600 mt-2">
          {formatCurrency(producto.PrecioUnitario)}
        </p>
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleViewDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Ver Detalles
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoItem;