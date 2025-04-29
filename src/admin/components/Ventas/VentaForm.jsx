import React, { useState, useEffect } from 'react';
import { createVenta, updateVenta } from '../../services/ventaService';
import { getClientes } from '../../services/clienteService';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import Button from '../../../shared/components/Button';

const VentaForm = ({ ventaToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    ClienteID: '',
    Total: '',
    MetodoPago: 'Efectivo',
    Estado: 'Completada',
  });
  const [clientes, setClientes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
      } catch (err) {
        setError(err.message || 'Error al cargar clientes');
      }
    };
    fetchClientes();
  }, []);

  useEffect(() => {
    if (ventaToEdit) {
      setFormData({
        ClienteID: ventaToEdit.ClienteID,
        Total: ventaToEdit.Total,
        MetodoPago: ventaToEdit.MetodoPago,
        Estado: ventaToEdit.Estado,
      });
    }
  }, [ventaToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (ventaToEdit) {
        await updateVenta(ventaToEdit.VentaID, formData);
      } else {
        await createVenta(formData);
      }
      onSave();
      setFormData({ ClienteID: '', Total: '', MetodoPago: 'Efectivo', Estado: 'Completada' });
    } catch (err) {
      setError(err.message || 'Error al guardar la venta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">{ventaToEdit ? 'Editar Venta' : 'Nueva Venta'}</h2>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="ClienteID" className="block text-gray-700 mb-1">Cliente</label>
          <select
            id="ClienteID"
            name="ClienteID"
            value={formData.ClienteID}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Selecciona un cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.ClienteID} value={cliente.ClienteID}>
                {cliente.Nombre} (ID: {cliente.ClienteID})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="Total" className="block text-gray-700 mb-1">Total</label>
          <input
            type="number"
            id="Total"
            name="Total"
            value={formData.Total}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            step="0.01"
            min="0"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="MetodoPago" className="block text-gray-700 mb-1">Método de Pago</label>
          <select
            id="MetodoPago"
            name="MetodoPago"
            value={formData.MetodoPago}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Efectivo">Efectivo</option>
            <option value="Tarjeta">Tarjeta</option>
            <option value="Transferencia">Transferencia</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="Estado" className="block text-gray-700 mb-1">Estado</label>
          <select
            id="Estado"
            name="Estado"
            value={formData.Estado}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Completada">Completada</option>
            <option value="Pendiente">Pendiente</option>
            <option value="Cancelada">Cancelada</option>
          </select>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </form>
    </div>
  );
};

export default VentaForm;