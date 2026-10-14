import { productosIniciales } from "../data/productos";
import CarritoLateral from "../components/CarritoLateral";

function Home({
  carrito,
  vaciarCarrito,
  comprar,
  agregarAlCarrito,
  disminuirCantidad,
  eliminarDelCarrito,
}) {
  // primeros 3 productos nomas
  const destacados = productosIniciales.slice(0, 3);

  return (
    <main>
      <div className="contenido-principal">
        <div className="caja-bienvenida">
          <h2>Bienvenid@ a HuertoHogar</h2>
          <p>Encuentra los mejores productos aquí</p>
        </div>

        <div className="productos-destacados">
          <h2>Productos Destacados</h2>

          <div id="productos-destacados-lista" className="grid-productos-destacados">
            {destacados.map((producto) => (
              <div key={producto.id} className="product">
                <strong>{producto.nombre}</strong>
                <br />
                Precio: ${producto.precio} por {producto.unidad}
                <br />
                Descripción: {producto.descripcion}
                <br />
                <button className="btn-principal" onClick={() => agregarAlCarrito(producto.id)}>
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>

          <br />
          <a href="#" className="btn-ver-mas">
            Ver todos los productos →
          </a>
        </div>

        <div className="blog-reciente">
          <h2>Blog Reciente</h2>
          <ul>
            <li>
              <a href="#post1">Post 1</a>
            </li>
            <li>
              <a href="#post2">Post 2</a>
            </li>
          </ul>
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

export default Home;