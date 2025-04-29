import React, { useState, useEffect } from 'react';
import { createCliente, updateCliente } from '../../services/clienteService';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import Button from '../../../shared/components/Button';

const ClienteForm = ({ clienteToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    Nombre: '',
    DNI: '',
    Telefono: '',
    Email: '',
    HistorialMedico: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clienteToEdit) {
      setFormData({
        Nombre: clienteToEdit.Nombre,
        DNI: clienteToEdit.DNI,
        Telefono: clienteToEdit.Telefono || '',
        Email: clienteToEdit.Email || '',
        HistorialMedico: clienteToEdit.HistorialMedico || '',
      });
    }
  }, [clienteToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (clienteToEdit) {
        await updateCliente(clienteToEdit.ClienteID, formData);
      } else {
        await createCliente(formData);
      }
      onSave();
      setFormData({ Nombre: '', DNI: '', Telefono: '', Email: '', HistorialMedico: '' });
    } catch (err) {
      setError(err.message || 'Error al guardar el cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">{clienteToEdit ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>
      {error && <ErrorMessage message={error} />}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="Nombre" className="block text-gray-700 mb-1">Nombre</label>
          <input
            type="text"
            id="Nombre"
            name="Nombre"
            value={formData.Nombre}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="DNI" className="block text-gray-700 mb-1">DNI</label>
          <input
            type="text"
            id="DNI"
            name="DNI"
            value={formData.DNI}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Telefono" className="block text-gray-700 mb-1">Teléfono</label>
          <input
            type="text"
            id="Telefono"
            name="Telefono"
            value={formData.Telefono}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Email" className="block text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="Email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="HistorialMedico" className="block text-gray-700 mb-1">Historial Médico</label>
          <textarea
            id="HistorialMedico"
            name="HistorialMedico"
            value={formData.HistorialMedico}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Guardando...' : 'Guardar'}
        </Button>
      </form>
    </div>
  );
};

export default ClienteForm;