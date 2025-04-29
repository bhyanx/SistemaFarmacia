import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as detalleVentaService from '../../services/detalleVentaService';
import * as ventaService from '../../services/ventaService';
import * as productoService from '../../services/productoService';
import Loading from '../../../shared/components/Loading';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const DetalleVentaForm = () => {
  const { id, ventaId } = useParams(); // id: DetalleVentaID, ventaId: VentaID (opcional)
  const [formData, setFormData] = useState({
    VentaID: ventaId || '',
    ProductoID: '',
    Cantidad: '',
    PrecioUnitario: '',
  });
  const [ventas, setVentas] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Obtiene ventas y productos para los selects
        const [ventasData, productosData] = await Promise.all([
          ventaService.getVentas(),
          productoService.getProductos(),
        ]);
        setVentas(ventasData);
        setProductos(productosData);

        // Si es edición, carga los datos del detalle
        if (id) {
          const detalle = await detalleVentaService.getDetalleById(id);
          setFormData({
            VentaID: detalle.VentaID,
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
        VentaID: parseInt(formData.VentaID),
        ProductoID: parseInt(formData.ProductoID),
        Cantidad: parseInt(formData.Cantidad),
        PrecioUnitario: parseFloat(formData.PrecioUnitario),
      };

      if (id) {
        await detalleVentaService.updateDetalle(id, data);
      } else {
        await detalleVentaService.createDetalle(data);
      }
      navigate(ventaId ? `/admin/ventas/${ventaId}/detalles` : '/admin/detalle-ventas');
    } catch (err) {
      setError(err.message || 'Error al guardar el detalle de venta');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">
        {id ? 'Editar Detalle de Venta' : 'Nuevo Detalle de Venta'}
      </h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-lg">
        <div className="mb-4">
          <label htmlFor="VentaID" className="block text-gray-700 font-medium mb-2">
            Venta
          </label>
          <select
            id="VentaID"
            name="VentaID"
            value={formData.VentaID}
            onChange={handleChange}
            required
            disabled={!!ventaId} // Deshabilita si se pasa ventaId
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Selecciona una venta</option>
            {ventas.map((venta) => (
              <option key={venta.VentaID} value={venta.VentaID}>
                Venta #{venta.VentaID}
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
              navigate(ventaId ? `/admin/ventas/${ventaId}/detalles` : '/admin/detalle-ventas')
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

export default DetalleVentaForm;