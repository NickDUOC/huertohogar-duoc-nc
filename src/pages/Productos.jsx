import { productosIniciales } from "../data/productos";
import CarritoLateral from "../components/CarritoLateral";

function Productos({
  carrito,
  vaciarCarrito,
  comprar,
  agregarAlCarrito,
  disminuirCantidad,
  eliminarDelCarrito,
}) {
  return (
    <main>
      <div className="contenido-principal">
        <div>
          <h1>Productos disponibles</h1>

          {/* renderizado de la lista de productos */}
          <div id="product-list" className="grid-productos">
            {productosIniciales.map((producto) => (
              <div key={producto.id} className="product">
                <strong>{producto.nombre}</strong>
                <br />
                Precio: ${producto.precio} por {producto.unidad}
                <br />
                Descripción: {producto.descripcion}
                <br />
                <button
                  className="btn-principal"
                  onClick={() => agregarAlCarrito(producto.id)}
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* carrito lateral */}
      <CarritoLateral
        carrito={carrito}
        vaciarCarrito={vaciarCarrito}
        comprar={comprar}
        agregarAlCarrito={agregarAlCarrito}
        disminuirCantidad={disminuirCantidad}
        eliminarDelCarrito={eliminarDelCarrito}
      />
    </main>
  );
}

export default Productos;
