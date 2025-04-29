import api from '../../shared/api/axiosInstance';

// Obtener todas las ventas de un cliente
export const getVentasByCliente = async (clienteId) => {
  try {
    const response = await api.get(`/Ventas/cliente/${clienteId}`);
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

// Crear una nueva venta
export const createVenta = async (ventaData) => {
  try {
    const response = await api.post('/Ventas', ventaData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error creating venta', message: error.message };
  }
};