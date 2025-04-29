import { useState, useCallback } from 'react';
import api from '../api/axiosInstance';

export function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(async (config) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api(config);
      setIsLoading(false);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Error en la solicitud');
      setIsLoading(false);
      throw err;
    }
  }, []);

  return { isLoading, error, request };
}