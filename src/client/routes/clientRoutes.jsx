import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ProductosPage from '../pages/ProductosPage';
import VentasPage from '../pages/VentasPage';
import RecetasPage from '../pages/RecetasPage';
import CartPage from '../pages/CartPage';
import NotFoundPage from '../pages/NotFoundPage';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/productos/*" element={<ProductosPage />} />
      <Route path="/ventas" element={<VentasPage />} />
      <Route path="/recetas" element={<RecetasPage />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default ClientRoutes;