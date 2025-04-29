import { useState, useEffect } from 'react';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const CompraForm = ({ compra, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    ProveedorID: '',
    FechaCompra: '',
    FechaEntrega: '',
    Total: '',
    Estado: 'Recibida',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (compra) {
      setFormData({
        ProveedorID: compra.ProveedorID || '',
        FechaCompra: compra.FechaCompra ? compra.FechaCompra.split('T')[0] : '',
        FechaEntrega: compra.FechaEntrega ? compra.FechaEntrega.split('T')[0] : '',
        Total: compra.Total || '',
        Estado: compra.Estado || 'Recibida',
      });
    }
  }, [compra]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.ProveedorID || !formData.FechaCompra || !formData.Total) {
      setError('Proveedor, Fecha de Compra y Total son obligatorios');
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">{compra ? 'Editar Compra' : 'Nueva Compra'}</h2>
      {error && <ErrorMessage message={error} />}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Proveedor ID</label>
        <input
          type="number"
          name="ProveedorID"
          value={formData.ProveedorID}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Fecha Compra</label>
        <input
          type="date"
          name="FechaCompra"
          value={formData.FechaCompra}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Fecha Entrega</label>
        <input
          type="date"
          name="FechaEntrega"
          value={formData.FechaEntrega}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Total</label>
        <input
          type="number"
          name="Total"
          value={formData.Total}
          onChange={handleChange}
          step="0.01"
          className="w-full p-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Estado</label>
        <select
          name="Estado"
          value={formData.Estado}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="Recibida">Recibida</option>
          <option value="Pendiente">Pendiente</option>
          <option value="Cancelada">Cancelada</option>
        </select>
      </div>
      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {compra ? 'Actualizar' : 'Crear'}
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

export default CompraForm;