import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "./Login.jsx";

/**
 * función para login dentro de un router simulado.
 */
function renderLogin() {
  render(
    <MemoryRouter initialEntries={["/login"]}>
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              carrito={[]}
              vaciarCarrito={() => {}}
              comprar={() => {}}
              agregarAlCarrito={() => {}}
              disminuirCantidad={() => {}}
              eliminarDelCarrito={() => {}}
            />
          }
        />
        <Route path="/admin" element={<h1>Panel Administrador</h1>} />
      </Routes>
    </MemoryRouter>
  );
}

describe("Página Login (Interacciones y Formulario)", () => {
  // prueba 8
  it("muestra mensaje de error cuando los campos están vacíos al intentar ingresar", () => {
    renderLogin();

    const boton = screen.getByRole("button", { name: /iniciar sesión/i });
    fireEvent.click(boton);

    expect(screen.getByText(/debe completar usuario y contraseña/i)).toBeInTheDocument();
  });

  // prueba 9
  it("muestra mensaje de error cuando las credenciales son incorrectas", () => {
    renderLogin();

    const inputUsuario = screen.getByLabelText(/correo\/usuario/i);
    const inputPassword = screen.getByLabelText(/contraseña/i);

    const boton = screen.getByRole("button", { name: /iniciar sesión/i });

    fireEvent.change(inputUsuario, { target: { value: "usuario@hotmail.com" } });
    fireEvent.change(inputPassword, { target: { value: "clave123" } });
    fireEvent.click(boton);

    expect(screen.getByText(/credenciales incorrectas/i)).toBeInTheDocument();
  });

  // prueba 10 (spy)
  it("almacena sesión en localStorage y permite acceder con credenciales de admin", () => {
    // espía el método setitem de localstorage
    const spySetItem = vi.spyOn(Storage.prototype, "setItem");

    renderLogin();

    const inputUsuario = screen.getByLabelText(/correo\/usuario/i);
    const inputPassword = screen.getByLabelText(/contraseña/i);
    
    const boton = screen.getByRole("button", { name: /iniciar sesión/i });

    // credenciales
    fireEvent.change(inputUsuario, { target: { value: "admin@duoc.cl" } });
    fireEvent.change(inputPassword, { target: { value: "admin" } });
    fireEvent.click(boton);

    // verifica que se haya grabado
    expect(spySetItem).toHaveBeenCalledWith(
      "usuarioActual",
      JSON.stringify({ usuario: "admin@duoc.cl", rol: "ADMIN" })
    );

    // verifica que aparezca el boton
    expect(
      screen.getByRole("button", { name: /ir al panel de administración/i })
    ).toBeInTheDocument();

    spySetItem.mockRestore();
  });
});
