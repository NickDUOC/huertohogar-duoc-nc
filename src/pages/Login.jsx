import { useState } from "react";
import CarritoLateral from "../components/CarritoLateral";
import { useNavigate } from "react-router-dom";
import { iniciarSesion } from "../auth/auth.js";

function Login({
  carrito,
  vaciarCarrito,
  comprar,
  agregarAlCarrito,
  disminuirCantidad,
  eliminarDelCarrito,
  setPaginaActual,
  setUsuarioSesion,
}) {
  const navigate = useNavigate();

  // estados para los inputs
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");

  // estados para los mensajes de error y estado de login
  const [errores, setErrores] = useState([]);
  const [esAdmin, setEsAdmin] = useState(false);
  const [esCliente, setEsCliente] = useState(false);

  // administrador
  const correctoUsuario = "admin@duoc.cl";
  const correctoPassword = "admin";

  const handleSubmit = (e) => {
  e.preventDefault();

  const usuarioLimpio = usuario.trim();
  const passwordLimpia = password.trim();

  if (!usuarioLimpio || !passwordLimpia) {
    setErrores(["Debe completar usuario y contraseña."]);
    setEsAdmin(false);
    setEsCliente(false);
    return;
  }

  const resultado = iniciarSesion(usuarioLimpio, passwordLimpia);

  if (!resultado.exito) {
    setErrores([resultado.error || "Credenciales incorrectas."]);
    setEsAdmin(false);
    setEsCliente(false);
  } else {
    setErrores([]);
    if (resultado.rol === "ADMIN") {
      setEsAdmin(true);
      setEsCliente(false);
    } else {
      setEsAdmin(false);
      setEsCliente(true);
    }
    if (setUsuarioSesion) setUsuarioSesion(resultado.sesion);
    setUsuario("");
    setPassword("");
  }
};

  return (
    <main>
      <div className="contenido-principal">
        <form id="iniciosesion" onSubmit={handleSubmit}>
          <h2>Iniciar Sesión</h2>

          <div className="campo">
            <label htmlFor="usuario">Correo/Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              maxLength="100"
              placeholder="Ej: ana@duoc.cl"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ej: ********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-principal">
            Iniciar Sesión
          </button>
        </form>

        {/* zona de mensajes */}
        <div id="mensajes">
          {errores.length > 0 &&
            errores.map((error, index) => (
              <div key={index} className="error">
                ⚠️ {error}
              </div>
            ))}

          {esAdmin && (
            <div className="exito">
              ✅ Login Admin realizado correctamente.
              <br />
              <br />
                <button
                  type="button"
                  className="btn-principal"
                  onClick={() => navigate("/admin")}>
                  Ir al Panel de Administración
                </button>
            </div>
          )}

          {esCliente && (
            <div className="exito">
              ✅ Login realizado correctamente.
            </div>
          )}
        </div>
      </div>

      {/* carrito lateral reutilizable */}
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

export default Login;