import api from '../../shared/api/axiosInstance';

export const getProductos = async () => {
  try {
    const response = await api.get('/Productos');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching products', message: 'Unknown error' };
  }
};

export const getProductoById = async (id) => {
  try {
    const response = await api.get(`/Productos/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching product', message: 'Unknown error' };
  }
};