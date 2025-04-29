import ProductoItem from './productoItem';

const ProductoList = ({ productos }) => {
  if (!productos || productos.length === 0) {
    return <p className="text-center text-gray-600">No hay productos disponibles.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {productos.map((producto) => (
        <ProductoItem key={producto.ProductoID} producto={producto} />
      ))}
    </div>
  );
};

export default ProductoList;