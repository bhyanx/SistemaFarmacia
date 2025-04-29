import api from '../../shared/api/axiosInstance';

// Obtener todas las ventas
export const getVentas = async () => {
  try {
    const response = await api.get('/Ventas');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching ventas', message: error.message };
  }
};

// Obtener una venta por ID
export const getVentaById = async (id) => {
  try {
    const response = await api.get(`/Ventas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching venta', message: error.message };
  }
};

// Obtener ventas por cliente
export const getVentasByCliente = async (clienteId) => {
  try {
    const response = await api.get(`/Ventas/cliente/${clienteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching ventas by cliente', message: error.message };
  }
};

// Crear una nueva venta
export const createVenta = async (ventaData) => {
  try {
    const response = await api.post('/Ventas', ventaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error creating venta', message: error.message };
  }
};

// Actualizar una venta
export const updateVenta = async (id, ventaData) => {
  try {
    const response = await api.put(`/Ventas/${id}`, ventaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error updating venta', message: error.message };
  }
};

// Eliminar una venta (soft delete)
export const deleteVenta = async (id) => {
  try {
    const response = await api.delete(`/Ventas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error deleting venta', message: error.message };
  }
};