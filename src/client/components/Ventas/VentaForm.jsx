import React, { useState, useContext } from 'react';
import { createVenta } from '../../services/ventaService';
import { CartContext } from '../../../shared/context/CartContext';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import Button from '../../../shared/components/Button';
import { formatCurrency } from '../../../shared/utils/formatCurrency';

const VentaForm = ({ clienteId, onVentaCreated }) => {
  const { cart, clearCart } = useContext(CartContext);
  const [metodoPago, setMetodoPago] = useState('Efectivo');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.PrecioUnitario * item.Cantidad, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const ventaData = {
        ClienteID: clienteId,
        Total: total,
        MetodoPago: metodoPago,
        Estado: 'Completada',
      };

      const response = await createVenta(ventaData);
      clearCart(); // Limpia el carrito tras la venta
      onVentaCreated(response); // Notifica al componente padre
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Error al crear la venta');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Finalizar Compra</h2>
      {error && <ErrorMessage message={error} />}
      {cart.length === 0 ? (
        <p className="text-gray-600">El carrito está vacío.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Resumen</h3>
            <ul className="mb-2">
              {cart.map((item) => (
                <li key={item.ProductoID} className="text-gray-600">
                  {item.Nombre} x {item.Cantidad} - {formatCurrency(item.PrecioUnitario * item.Cantidad)}
                </li>
              ))}
            </ul>
            <p className="text-lg font-bold">Total: {formatCurrency(total)}</p>
          </div>
          <div className="mb-4">
            <label htmlFor="metodoPago" className="block text-gray-700 mb-1">
              Método de Pago
            </label>
            <select
              id="metodoPago"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
              <option value="Transferencia">Transferencia</option>
            </select>
          </div>
          <Button type="submit" disabled={loading || cart.length === 0} className="w-full">
            {loading ? 'Procesando...' : 'Confirmar Compra'}
          </Button>
        </form>
      )}
    </div>
  );
};

export default VentaForm;