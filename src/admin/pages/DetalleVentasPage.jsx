import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import DetalleVentaList from '../components/DetalleVentas/DetalleVentaList';

const DetalleVentasPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-6">Gestión de Detalles de Ventas</h1>
            <DetalleVentaList />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DetalleVentasPage;