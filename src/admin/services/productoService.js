import api from '../../shared/api/axiosInstance';

export const getProductos = async () => {
  try {
    const response = await api.get('/Productos');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching productos', message: 'Unknown error' };
  }
};

export const getProductoById = async (id) => {
  try {
    const response = await api.get(`/Productos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching producto', message: 'Unknown error' };
  }
};

export const createProducto = async (productoData) => {
  try {
    const response = await api.post('/Productos', productoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error creating producto', message: 'Unknown error' };
  }
};

export const updateProducto = async (id, productoData) => {
  try {
    const response = await api.put(`/Productos/${id}`, productoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error updating producto', message: 'Unknown error' };
  }
};

export const deleteProducto = async (id) => {
  try {
    const response = await api.delete(`/Productos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error deleting producto', message: 'Unknown error' };
  }
};