import React, { useState } from 'react';
import ClienteList from '../components/Clientes/ClienteList';
import ClienteForm from '../components/Clientes/ClienteForm';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const ClientesPage = () => {
  const [clienteToEdit, setClienteToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setClienteToEdit(null);
    setRefresh(!refresh);
  };

  const handleEdit = (cliente) => {
    setClienteToEdit(cliente);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Gestión de Clientes</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <ClienteForm clienteToEdit={clienteToEdit} onSave={handleSave} />
            </div>
            <div className="md:col-span-2">
              <ClienteList onEdit={handleEdit} refresh={refresh} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default ClientesPage;