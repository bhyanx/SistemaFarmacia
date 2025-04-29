import ProductoItem from './productoItem';
const ProductoList = ({ productos, onEdit, onDelete }) => {
  if (!productos || productos.length === 0) {
    return <p className="text-center text-gray-600">No hay productos registrados.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-left">ID</th>
            <th className="py-3 px-4 text-left">Nombre</th>
            <th className="py-3 px-4 text-left">Genérico</th>
            <th className="py-3 px-4 text-left">Categoría</th>
            <th className="py-3 px-4 text-left">Stock</th>
            <th className="py-3 px-4 text-left">Precio</th>
            <th className="py-3 px-4 text-left">Vencimiento</th>
            <th className="py-3 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <ProductoItem
              key={producto.ProductoID}
              producto={producto}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductoList;