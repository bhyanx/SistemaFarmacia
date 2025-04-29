import api from '../../shared/api/axiosInstance';

// Obtiene todos los detalles de ventas
export const getDetalles = async () => {
  try {
    const response = await api.get('/DetalleVentas');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener los detalles de ventas' };
  }
};

// Obtiene los detalles de una venta específica por VentaID
export const getDetallesByVenta = async (ventaId) => {
  try {
    const response = await api.get(`/DetalleVentas/venta/${ventaId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: `Error al obtener los detalles de la venta ${ventaId}` };
  }
};

// Obtiene un detalle de venta por su ID
export const getDetalleById = async (id) => {
  try {
    const response = await api.get(`/DetalleVentas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: `Error al obtener el detalle con ID ${id}` };
  }
};

// Crea un nuevo detalle de venta
export const createDetalle = async (detalleData) => {
  try {
    const response = await api.post('/DetalleVentas', detalleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al crear el detalle de venta' };
  }
};

// Actualiza un detalle de venta existente
export const updateDetalle = async (id, detalleData) => {
  try {
    const response = await api.put(`/DetalleVentas/${id}`, detalleData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: `Error al actualizar el detalle con ID ${id}` };
  }
};

// Elimina un detalle de venta por su ID
export const deleteDetalle = async (id) => {
  try {
    const response = await api.delete(`/DetalleVentas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: `Error al eliminar el detalle con ID ${id}` };
  }
};