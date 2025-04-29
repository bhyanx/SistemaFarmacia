import React, { useState, useContext } from 'react';
import VentaList from '../components/Ventas/VentaList';
import VentaForm from '../components/Ventas/VentaForm';
import { AuthContext } from '../../shared/context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const VentasPage = () => {
  const { user } = useContext(AuthContext); // Asume que el usuario está autenticado
  const [ventaCreated, setVentaCreated] = useState(false);

  const handleVentaCreated = () => {
    setVentaCreated(true); // Forza recarga de la lista de ventas
    setTimeout(() => setVentaCreated(false), 100); // Resetea el estado
  };

  // Asume que el clienteId está disponible en el contexto de autenticación
  const clienteId = user?.ClienteID || 1; // Valor por defecto para pruebas

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Mis Compras</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Realizar Nueva Compra</h2>
            <VentaForm clienteId={clienteId} onVentaCreated={handleVentaCreated} />
          </div>
          <div>
            <VentaList clienteId={clienteId} key={ventaCreated} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VentasPage;