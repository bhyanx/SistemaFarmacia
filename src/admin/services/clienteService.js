import api from '../../shared/api/axiosInstance';

// Obtener todos los clientes
export const getClientes = async () => {
  try {
    const response = await api.get('/Clientes');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching clientes', message: error.message };
  }
};

// Obtener un cliente por ID
export const getClienteById = async (id) => {
  try {
    const response = await api.get(`/Clientes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching cliente', message: error.message };
  }
};

// Crear un nuevo cliente
export const createCliente = async (clienteData) => {
  try {
    const response = await api.post('/Clientes', clienteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error creating cliente', message: error.message };
  }
};

// Actualizar un cliente
export const updateCliente = async (id, clienteData) => {
  try {
    const response = await api.put(`/Clientes/${id}`, clienteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error updating cliente', message: error.message };
  }
};

// Eliminar un cliente (soft delete)
export const deleteCliente = async (id) => {
  try {
    const response = await api.delete(`/Clientes/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error deleting cliente', message: error.message };
  }
};