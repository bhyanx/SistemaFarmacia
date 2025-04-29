import { useState, useEffect } from 'react';
import { getCompras, createCompra, updateCompra, deleteCompra } from '../services/compraService';
import CompraList from '../components/Compras/compraList';
import CompraForm from '../components/Compras/compraForm';
import Loading from '../../shared/components/Loading';
import ErrorMessage from '../../shared/components/ErrorMessage';

const ComprasPage = () => {
  const [compras, setCompras] = useState([]);
  const [selectedCompra, setSelectedCompra] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const data = await getCompras();
        setCompras(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchCompras();
  }, []);

  const handleCreateOrUpdate = async (compraData) => {
    try {
      if (selectedCompra) {
        await updateCompra(selectedCompra.CompraID, compraData);
        setCompras(compras.map((c) => (c.CompraID === selectedCompra.CompraID ? { ...c, ...compraData } : c)));
      } else {
        const newCompra = await createCompra(compraData);
        setCompras([...compras, newCompra]);
      }
      setShowForm(false);
      setSelectedCompra(null);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCompra(id);
      setCompras(compras.filter((c) => c.CompraID !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (compra) => {
    setSelectedCompra(compra);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedCompra(null);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Compras</h1>
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-6"
      >
        Nueva Compra
      </button>
      {showForm && (
        <CompraForm
          compra={selectedCompra}
          onSubmit={handleCreateOrUpdate}
          onCancel={handleCancel}
        />
      )}
      <CompraList compras={compras} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ComprasPage;