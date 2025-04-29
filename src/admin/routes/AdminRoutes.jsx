import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../pages/DashboardPage';
import VentasPage from '../pages/VentasPage';
import ClientesPage from '../pages/ClientesPage';
import ProductosPage from '../pages/ProductosPage';
import ProveedoresPage from '../pages/ProveedoresPage';
import RecetasPage from '../pages/RecetasPage';
import AlertasPage from '../pages/AlertasPage';
import ComprasPage from '../pages/ComprasPage';
import DetalleComprasPage from '../pages/DetalleComprasPage';
import DetalleVentasPage from '../pages/DetalleVentasPage';
import DetalleRecetasPage from '../pages/DetalleRecetasPage';
import ProductoProveedoresPage from '../pages/ProductoProveedoresPage';
import UsuariosPage from '../pages/UsuariosPage';
import NotFoundPage from '../pages/NotFoundPage';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/ventas" element={<VentasPage />} />
      <Route path="/clientes" element={<ClientesPage />} />
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/proveedores" element={<ProveedoresPage />} />
      <Route path="/recetas" element={<RecetasPage />} />
      <Route path="/alertas" element={<AlertasPage />} />
      <Route path="/compras" element={<ComprasPage />} />
      <Route path="/detalle-compras" element={<DetalleComprasPage />} />
      <Route path="/detalle-ventas" element={<DetalleVentasPage />} />
      <Route path="/detalle-recetas" element={<DetalleRecetasPage />} />
      <Route path="/producto-proveedores" element={<ProductoProveedoresPage />} />
      <Route path="/usuarios" element={<UsuariosPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AdminRoutes;