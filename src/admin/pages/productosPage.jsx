import { useState, useEffect } from 'react';
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/productoService';
import ProductoList from '../components/Productos/productoList';
import ProductoForm from '../components/Productos/productoForm';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await getProductos();
        setProductos(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  const handleCreateOrUpdate = async (productoData) => {
    try {
      if (selectedProducto) {
        await updateProducto(selectedProducto.ProductoID, productoData);
        setProductos(productos.map((p) => (p.ProductoID === selectedProducto.ProductoID ? { ...p, ...productoData } : p)));
      } else {
        const newProducto = await createProducto(productoData);
        setProductos([...productos, newProducto]);
      }
      setShowForm(false);
      setSelectedProducto(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProducto(id);
      setProductos(productos.filter((p) => p.ProductoID !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (producto) => {
    setSelectedProducto(producto);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedProducto(null);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Productos</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
      >
        Nuevo Producto
      </button>
      {showForm && (
        <ProductoForm
          producto={selectedProducto}
          onSubmit={handleCreateOrUpdate}
          onCancel={handleCancel}
        />
      )}
      <ProductoList productos={productos} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ProductosPage;