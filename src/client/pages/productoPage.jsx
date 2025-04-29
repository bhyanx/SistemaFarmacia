import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getProductos } from '../services/productoService';
import ProductoList from '../components/Productos/productoList';
import ProductoDetail from '../components/Productos/productoDetail';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar los productos');
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Productos</h1>
      <Routes>
        <Route index element={<ProductoList productos={productos} />} />
        <Route path=":id" element={<ProductoDetail />} />
      </Routes>
    </div>
  );
};

export default ProductosPage;