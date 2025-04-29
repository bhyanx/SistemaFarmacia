import React, { useState, useEffect } from 'react';
import { getClientes } from '../../services/clienteService';
import ClienteItem from './ClienteItem';
import Loading from '../../../shared/components/Loading';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const ClienteList = ({ onEdit, refresh }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const data = await getClientes();
        setClientes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error al cargar los clientes');
        setLoading(false);
      }
    };
    fetchClientes();
  }, [refresh]);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        await deleteCliente(id);
        setClientes(clientes.filter((cliente) => cliente.ClienteID !== id));
      } catch (err) {
        setError(err.message || 'Error al eliminar el cliente');
      }
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Nombre</th>
            <th className="p-2 text-left">DNI</th>
            <th className="p-2 text-left">Teléfono</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Historial Médico</th>
            <th className="p-2 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.length === 0 ? (
            <tr>
              <td colSpan="7" className="p-2 text-center text-gray-600">
                No hay clientes registrados.
              </td>
            </tr>
          ) : (
            clientes.map((cliente) => (
              <ClienteItem
                key={cliente.ClienteID}
                cliente={cliente}
                onEdit={onEdit}
                onDelete={handleDelete}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteList;