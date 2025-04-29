import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as recetaService from '../../services/recetaService';
import * as detalleRecetaService from '../../services/detalleRecetaService';
import Loading from '../../../shared/components/Loading';
import ErrorMessage from '../../../shared/components/ErrorMessage';
import { formatDate } from '../../../shared/utils/formatDate';

const RecetaDetail = () => {
  const { id } = useParams(); // Obtiene el RecetaID de la URL
  const [receta, setReceta] = useState(null);
  const [detalles, setDetalles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecetaDetails = async () => {
      try {
        setLoading(true);
        // Obtiene la receta por ID
        const recetaData = await recetaService.getRecetaById(id);
        setReceta(recetaData);

        // Obtiene los detalles de la receta
        const detallesData = await detalleRecetaService.getDetallesReceta();
        const recetaDetalles = detallesData.filter(
          (detalle) => detalle.RecetaID === parseInt(id)
        );
        setDetalles(recetaDetalles);
      } catch (err) {
        setError(err.response?.data?.message || 'Error al cargar los detalles de la receta');
      } finally {
        setLoading(false);
      }
    };

    fetchRecetaDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/client/recetas');
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!receta) return <ErrorMessage message="Receta no encontrada" />;

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleBack}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
      >
        Volver a Recetas
      </button>
      <h2 className="text-2xl font-bold mb-4">Detalles de la Receta #{receta.RecetaID}</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="text-gray-600">
          <span className="font-medium">Fecha de Emisión:</span>{' '}
          {formatDate(receta.FechaEmision)}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Médico:</span> {receta.Medico}
        </p>
        <p className="text-gray-600">
          <span className="font-medium">Estado:</span>{' '}
          <span
            className={`${
              receta.Estado === 'Pendiente' ? 'text-yellow-600' : 'text-green-600'
            }`}
          >
            {receta.Estado}
          </span>
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-4">Productos Prescritos</h3>
      {detalles.length === 0 ? (
        <p className="text-gray-600">No hay productos prescritos en esta receta.</p>
      ) : (
        <div className="grid gap-4">
          {detalles.map((detalle) => (
            <div
              key={detalle.DetalleRecetaID}
              className="bg-white shadow-md rounded-lg p-4"
            >
              <p className="text-gray-600">
                <span className="font-medium">Producto ID:</span> {detalle.ProductoID}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Cantidad:</span> {detalle.Cantidad}
              </p>
              {detalle.Dosis && (
                <p className="text-gray-600">
                  <span className="font-medium">Dosis:</span> {detalle.Dosis}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecetaDetail;