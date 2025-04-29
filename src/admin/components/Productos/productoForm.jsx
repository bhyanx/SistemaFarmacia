import { useState, useEffect } from 'react';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const ProductoForm = ({ producto, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    Nombre: '',
    NombreGenerico: '',
    Categoria: '',
    StockActual: '',
    StockMinimo: '',
    PrecioUnitario: '',
    FechaVencimiento: '',
    Lote: '',
    Ubicacion: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (producto) {
      setFormData({
        Nombre: producto.Nombre || '',
        NombreGenerico: producto.NombreGenerico || '',
        Categoria: producto.Categoria || '',
        StockActual: producto.StockActual || '',
        StockMinimo: producto.StockMinimo || '',
        PrecioUnitario: producto.PrecioUnitario || '',
        FechaVencimiento: producto.FechaVencimiento ? producto.FechaVencimiento.split('T')[0] : '',
        Lote: producto.Lote || '',
        Ubicacion: producto.Ubicacion || '',
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.Nombre ||
      !formData.NombreGenerico ||
      !formData.Categoria ||
      !formData.StockActual ||
      !formData.StockMinimo ||
      !formData.PrecioUnitario ||
      !formData.FechaVencimiento ||
      !formData.Lote ||
      !formData.Ubicacion
    ) {
      setError('Todos los campos son obligatorios');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">{producto ? 'Editar Producto' : 'Nuevo Producto'}</h2>
      {error && <ErrorMessage message={error} />}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nombre</label>
        <input
          type="text"
          name="Nombre"
          value={formData.Nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Nombre Genérico</label>
        <input
          type="text"
          name="NombreGenerico"
          value={formData.NombreGenerico}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Categoría</label>
        <input
          type="text"
          name="Categoria"
          value={formData.Categoria}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Stock Actual</label>
        <input
          type="number"
          name="StockActual"
          value={formData.StockActual}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Stock Mínimo</label>
        <input
          type="number"
          name="StockMinimo"
          value={formData.StockMinimo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Precio Unitario</label>
        <input
          type="number"
          name="PrecioUnitario"
          value={formData.PrecioUnitario}
          onChange={handleChange}
          step="0.01"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Fecha Vencimiento</label>
        <input
          type="date"
          name="FechaVencimiento"
          value={formData.FechaVencimiento}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Lote</label>
        <input
          type="text"
          name="Lote"
          value={formData.Lote}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Ubicación</label>
        <input
          type="text"
          name="Ubicacion"
          value={formData.Ubicacion}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {producto ? 'Actualizar' : 'Crear'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductoForm;