import { describe, expect, it } from "vitest";
import { calcularTotal, calcularCantidadTotal } from "./carrito.js";

describe("Cálculos del Carrito de Compras", () => {
  const carritoEjemplo = [
    { id: "FR001", nombre: "Manzanas Fuji", precio: 1200, cantidad: 3 },
    { id: "VR001", nombre: "Zanahorias Orgánicas", precio: 900, cantidad: 2 },
  ];

  // prueba 5
  it("calcularTotal calcula la sumatoria correcta de (precio * cantidad)", () => {
    const total = calcularTotal(carritoEjemplo);
    expect(total).toBe(5400);
  });

  // prueba 6
  it("calcularTotal retorna 0 cuando el carrito está vacío", () => {
    expect(calcularTotal([])).toBe(0);
  });

  // prueba 7
  it("calcularCantidadTotal calcula la cantidad total de unidades", () => {
    const totalUnidades = calcularCantidadTotal(carritoEjemplo);
    expect(totalUnidades).toBe(5);
  });
});