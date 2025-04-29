import api from '../../shared/api/axiosInstance';

// Obtiene todos los detalles de compras
export const getDetalles = async () => {
  try {
    const response = await api.get('/Detalles');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener los detalles de compras' };
  }
};

// Obtiene los detalles de una compra específica por CompraID
export const getDetallesByCompra = async (compraId) => {
  try {
    const response = await api.get(`/Detalles/compra/${compraId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: `Error al obtener los detalles de la compra ${compraId}` };
  }
};

// Obtiene un detalle de compra por su ID
export const getDetalleById = async (id) => {
  try {
    const response = await api.get(`/Detalles/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: `Error al obtener el detalle con ID ${id}` };
  }
};

// Crea un nuevo detalle de compra
export const createDetalle = async (detalleData) => {
  try {
    const response = await api.post('/Detalles', detalleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al crear el detalle de compra' };
  }
};

// Actualiza un detalle de compra existente
export const updateDetalle = async (id, detalleData) => {
  try {
    const response = await api.put(`/Detalles/${id}`, detalleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: `Error al actualizar el detalle con ID ${id}` };
  }
};

// Elimina un detalle de compra por su ID
export const deleteDetalle = async (id) => {
  try {
    const response = await api.delete(`/Detalles/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: `Error al eliminar el detalle con ID ${id}` };
  }
};