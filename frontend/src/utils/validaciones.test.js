import { describe, expect, it } from "vitest";
import {
  validarCorreo,
  validarRun,
  validarPassword,
} from "./validaciones.js";

describe("Validaciones de Formularios (HuertoHogar)", () => {
  // prueba 1
  it("validarCorreo acepta correos institucionales y comerciales válidos", () => {
    expect(validarCorreo("cliente@duoc.cl")).toBe(true);
    expect(validarCorreo("profesor@profesor.duoc.cl")).toBe(true);
    expect(validarCorreo("usuario@gmail.com")).toBe(true);
  });

  // prueba 2
  it("validarCorreo rechaza correos con dominios no autorizados o sin arroba", () => {
    expect(validarCorreo("usuario@hotmail.com")).toBe(false);
    expect(validarCorreo("usuario.duoc.cl")).toBe(false);
    expect(validarCorreo("")).toBe(false);
  });

  // prueba 3
  it("validarRun acepta RUN limpio de 7 a 9 caracteres y rechaza puntos o guiones", () => {
    expect(validarRun("19011022K")).toBe(true);
    expect(validarRun("187654321")).toBe(true);
    expect(validarRun("19.011.022-K")).toBe(false);
    expect(validarRun("12345")).toBe(false);
  });

  // prueba 4
  it("validarPassword verifica que el largo esté entre 4 y 10 caracteres", () => {
    expect(validarPassword("admin")).toBe(true);
    expect(validarPassword("123")).toBe(false);
    expect(validarPassword("12345678901")).toBe(false);
  });
});