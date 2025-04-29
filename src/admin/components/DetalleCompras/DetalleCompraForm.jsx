import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as detalleCompraService from '../../services/detalleCompraService';
import * as compraService from '../../services/compraService';
import * as productoService from '../../services/productoService';
import Loading from '../../../shared/components/Loading';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const DetalleCompraForm = () => {
  const { id, compraId } = useParams(); // id: DetalleCompraID, compraId: CompraID (opcional)
  const [formData, setFormData] = useState({
    CompraID: compraId || '',
    ProductoID: '',
    Cantidad: '',
    PrecioUnitario: '',
  });
  const [compras, setCompras] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtiene compras y productos para los selects
        const [comprasData, productosData] = await Promise.all([
          compraService.getCompras(),
          productoService.getProductos(),
        ]);
        setCompras(comprasData);
        setProductos(productosData);

        // Si es edición, carga los datos del detalle
        if (id) {
          const detalle = await detalleCompraService.getDetalleById(id);
          setFormData({
            CompraID: detalle.CompraID,
            ProductoID: detalle.ProductoID,
            Cantidad: detalle.Cantidad,
            PrecioUnitario: detalle.PrecioUnitario,
          });
        }
      } catch (err) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        CompraID: parseInt(formData.CompraID),
        ProductoID: parseInt(formData.ProductoID),
        Cantidad: parseInt(formData.Cantidad),
        PrecioUnitario: parseFloat(formData.PrecioUnitario),
      };

      if (id) {
        await detalleCompraService.updateDetalle(id, data);
      } else {
        await detalleCompraService.createDetalle(data);
      }
      navigate(compraId ? `/admin/compras/${compraId}/detalles` : '/admin/detalle-compras');
    } catch (err) {
      setError(err.message || 'Error al guardar el detalle de compra');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {id ? 'Editar Detalle de Compra' : 'Nuevo Detalle de Compra'}
      </h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-lg">
        <div className="mb-4">
          <label htmlFor="CompraID" className="block text-gray-700 font-medium mb-2">
            Compra
          </label>
          <select
            id="CompraID"
            name="CompraID"
            value={formData.CompraID}
            onChange={handleChange}
            required
            disabled={!!compraId} // Deshabilita si se pasa compraId
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona una compra</option>
            {compras.map((compra) => (
              <option key={compra.CompraID} value={compra.CompraID}>
                Compra #{compra.CompraID}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="ProductoID" className="block text-gray-700 font-medium mb-2">
            Producto
          </label>
          <select
            id="ProductoID"
            name="ProductoID"
            value={formData.ProductoID}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona un producto</option>
            {productos.map((producto) => (
              <option key={producto.ProductoID} value={producto.ProductoID}>
                {producto.Nombre} (ID: {producto.ProductoID})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="Cantidad" className="block text-gray-700 font-medium mb-2">
            Cantidad
          </label>
          <input
            type="number"
            id="Cantidad"
            name="Cantidad"
            value={formData.Cantidad}
            onChange={handleChange}
            required
            min="1"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="PrecioUnitario" className="block text-gray-700 font-medium mb-2">
            Precio Unitario
          </label>
          <input
            type="number"
            id="PrecioUnitario"
            name="PrecioUnitario"
            value={formData.PrecioUnitario}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() =>
              navigate(compraId ? `/admin/compras/${compraId}/detalles` : '/admin/detalle-compras')
            }
            className="mr-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {id ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetalleCompraForm;