import { useContext } from 'react';
import { AuthContext } from '../../shared/context/AuthContext';
import RecetaList from '../components/Recetas/RecetaList';
import ErrorMessage from '../../shared/components/ErrorMessage';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RecetasPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-center mb-6">Tus Recetas Médicas</h1>
          {user ? (
            <RecetaList />
          ) : (
            <ErrorMessage message="Por favor, inicia sesión para ver tus recetas." />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecetasPage;