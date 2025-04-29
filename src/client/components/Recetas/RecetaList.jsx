import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../shared/context/AuthContext';
import * as recetaService from '../../services/recetaService';
import RecetaItem from './RecetaItem';
import Loading from '../../../shared/components/Loading';
import ErrorMessage from '../../../shared/components/ErrorMessage';

const RecetaList = () => {
  const { user } = useContext(AuthContext); // Supone que user tiene ClienteID
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecetas = async () => {
      try {
        setLoading(true);
        const data = await recetaService.getRecetas(); // Obtiene todas las recetas
        // Filtra recetas por ClienteID del usuario autenticado
        const userRecetas = data.filter(receta => receta.ClienteID === user.ClienteID);
        setRecetas(userRecetas);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar las recetas');
      } finally {
        setLoading(false);
      }
    };

    if (user?.ClienteID) {
      fetchRecetas();
    } else {
      setError('No estás autenticado. Por favor, inicia sesión.');
      setLoading(false);
    }
  }, [user]);

  const handleViewDetails = (id) => {
    navigate(`/client/recetas/${id}`);
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mis Recetas</h2>
      {recetas.length === 0 ? (
        <p className="text-gray-600">No tienes recetas registradas.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recetas.map((receta) => (
            <RecetaItem
              key={receta.RecetaID}
              receta={receta}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecetaList;