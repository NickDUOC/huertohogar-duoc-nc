import { calcularTotal } from "../utils/carrito.js";

function CarritoLateral({
  carrito,
  vaciarCarrito,
  comprar,
  agregarAlCarrito,
  disminuirCantidad,
  eliminarDelCarrito,
}) {
  const totalPagar = calcularTotal(carrito);

  return (
    <aside>
      <h2>Carrito</h2>
      <div className="col-4">
        <div id="cart-list">
          {carrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            carrito.map((item) => (
              <div key={item.id} className="cart-item">
                <strong>{item.nombre}</strong>
                <br />
                Precio: ${item.precio} x {item.cantidad} = ${item.precio * item.cantidad}
                <br />
                <button onClick={() => agregarAlCarrito(item.id)}>+</button>
                <button onClick={() => disminuirCantidad(item.id)}>-</button>
                <button onClick={() => eliminarDelCarrito(item.id)}>
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        {carrito.length > 0 && <h3>Total: ${totalPagar}</h3>}

        <button
          id="vaciar-carrito"
          className="btn-secundario"
          onClick={vaciarCarrito}
        >
          Vaciar Carrito
        </button>
      </div>
      <button id="Comprar" onClick={comprar}>
        Comprar
      </button>
    </aside>
  );
}

export default CarritoLateral;