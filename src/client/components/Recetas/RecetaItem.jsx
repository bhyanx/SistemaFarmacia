import { formatDate } from '../../../shared/utils/formatDate';

const RecetaItem = ({ receta, onViewDetails }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">Receta #{receta.RecetaID}</h3>
      <p className="text-gray-600">
        <span className="font-medium">Fecha:</span> {formatDate(receta.FechaEmision)}
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
      <button
        onClick={() => onViewDetails(receta.RecetaID)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Ver Detalles
      </button>
    </div>
  );
};

export default RecetaItem;