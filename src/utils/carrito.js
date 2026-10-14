/* cálculo del monto total a pagar de los productos en el carrito */
export function calcularTotal(carrito) {
  if (!Array.isArray(carrito)) return 0;
  return carrito.reduce(
    (total, item) => total + (item.precio || 0) * (item.cantidad || 0),
    0
  );
}

/* cálculo de la cantidad total de unidades en el carrito. */
export function calcularCantidadTotal(carrito) {
  if (!Array.isArray(carrito)) return 0;
  return carrito.reduce(
    (total, item) => total + (item.cantidad || 0),
    0
  );
}