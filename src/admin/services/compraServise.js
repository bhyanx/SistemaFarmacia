import api from '../../shared/api/axiosInstance';

export const getCompras = async () => {
  try {
    const response = await api.get('/DetalleCompras');
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching compras', message: 'Unknown error' };
  }
};

export const getCompraById = async (id) => {
  try {
    const response = await api.get(`/DetalleCompras/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error fetching compra', message: 'Unknown error' };
  }
};

export const createCompra = async (compraData) => {
  try {
    const response = await api.post('/DetalleCompras', compraData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error creating compra', message: 'Unknown error' };
  }
};

export const updateCompra = async (id, compraData) => {
  try {
    const response = await api.put(`/DetalleCompras/${id}`, compraData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error updating compra', message: 'Unknown error' };
  }
};

export const deleteCompra = async (id) => {
  try {
    const response = await api.delete(`/DetalleCompras/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: 'Error deleting compra', message: 'Unknown error' };
  }
};