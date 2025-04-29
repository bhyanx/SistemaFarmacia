import api from '../../shared/api/axiosInstance';

// Obtiene todas las recetas activas
export const getRecetas = async () => {
  try {
    const response = await api.get('/Recetas');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al obtener las recetas' };
  }
};

// Obtiene una receta por su ID
export const getRecetaById = async (id) => {
  try {
    const response = await api.get(`/Recetas/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: `Error al obtener la receta con ID ${id}` };
  }
};