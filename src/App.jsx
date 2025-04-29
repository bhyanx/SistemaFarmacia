import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './admin/routes/AdminRoutes';
import ClientRoutes from './client/routes/ClientRoutes';
import NotFoundPage from './admin/pages/NotFoundPage'; // Reutilizamos NotFoundPage del admin

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/client/*" element={<ClientRoutes />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;