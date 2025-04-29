import React, { useState } from 'react';
import VentaList from '../components/Ventas/VentaList';
import VentaForm from '../components/Ventas/VentaForm';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const VentasPage = () => {
  const [ventaToEdit, setVentaToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleSave = () => {
    setVentaToEdit(null);
    setRefresh(!refresh);
  };

  const handleEdit = (venta) => {
    setVentaToEdit(venta);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Navbar />
        <main className="flex-grow container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Gestión de Ventas</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <VentaForm ventaToEdit={ventaToEdit} onSave={handleSave} />
            </div>
            <div className="md:col-span-2">
              <VentaList onEdit={handleEdit} refresh={refresh} />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default VentasPage;