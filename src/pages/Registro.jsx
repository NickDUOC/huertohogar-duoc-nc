import { useState } from "react";
import CarritoLateral from "../components/CarritoLateral";
import {
  validarRun,
  validarTexto,
  validarCorreo,
  validarPassword,
} from "../utils/validaciones.js";

function Registro({
  carrito,
  vaciarCarrito,
  comprar,
  agregarAlCarrito,
  disminuirCantidad,
  eliminarDelCarrito,
}) {
  // estado unificado para formulario
  const [formData, setFormData] = useState({
    run: "",
    nombre: "",
    apellidos: "",
    correo: "",
    reingresoCorreo: "",
    password: "",
    reingresoPassword: "",
    telefono: "",
    region: "",
    direccion: "",
  });

  // estados para errores y registro
  const [errores, setErrores] = useState([]);
  const [registroExitoso, setRegistroExitoso] = useState(null);

  // manejador para actualizar cualquier input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // función envío
  const handleSubmit = (e) => {
    e.preventDefault();

    const runLimpio = formData.run.trim();
    const nombreLimpio = formData.nombre.trim();
    const apellidosLimpio = formData.apellidos.trim();
    const correoLimpio = formData.correo.trim();
    const reingresoCorreoLimpio = formData.reingresoCorreo.trim();
    const passwordLimpia = formData.password.trim();
    const reingresoPasswordLimpia = formData.reingresoPassword.trim();
    const telefonoLimpio = formData.telefono.trim();
    const regionSeleccionada = formData.region;
    const direccionLimpia = formData.direccion.trim();

    const nuevosErrores = [];

    // validar run
    if (!validarRun(runLimpio)) {
      nuevosErrores.push("El RUN debe ser sin puntos ni guion y tener entre 7 y 9 caracteres (Ej: 19011022K).");
    }

    // validar nombre
    if (!validarTexto(nombreLimpio, 1, 50)) {
      nuevosErrores.push("El nombre es obligatorio y no puede superar los 50 caracteres.");
    }

    // validar apellidos
    if (!validarTexto(apellidosLimpio, 1, 100)) {
      nuevosErrores.push("Los apellidos son obligatorios y no pueden superar los 100 caracteres.");
    }

    // validar correo
    if (!validarCorreo(correoLimpio)) {
      nuevosErrores.push("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    }

    // validar reingreso de correo
    if (reingresoCorreoLimpio === "") {
      nuevosErrores.push("Debe reingresar su correo.");
    } else if (correoLimpio !== reingresoCorreoLimpio) {
      nuevosErrores.push("Los correos ingresados no coinciden.");
    }

    // validar contraseña con función pura
    if (!validarPassword(passwordLimpia, 4, 10)) {
      nuevosErrores.push("La contraseña debe tener entre 4 y 10 caracteres.");
    }

    // validar reingreso de contraseña
    if (reingresoPasswordLimpia === "") {
      nuevosErrores.push("Debe reingresar su contraseña.");
    } else if (passwordLimpia !== reingresoPasswordLimpia) {
      nuevosErrores.push("Las contraseñas ingresadas no coinciden.");
    }

    // validar región
    if (regionSeleccionada === "") {
      nuevosErrores.push("Debe seleccionar una región.");
    }

    // validar dirección
    if (!validarTexto(direccionLimpia, 1, 300)) {
      nuevosErrores.push("La dirección es obligatoria y no puede superar los 300 caracteres.");
    }

    // procesar resultados
    if (nuevosErrores.length > 0) {
      setErrores(nuevosErrores);
      setRegistroExitoso(null);
    } else {
      setErrores([]);
      const nuevoUsuario = {
        run: runLimpio,
        nombre: nombreLimpio,
        apellidos: apellidosLimpio,
        correo: correoLimpio,
        password: passwordLimpia,
        telefono: telefonoLimpio,
        region: regionSeleccionada,
        direccion: direccionLimpia,
      };

      // guardado en localstorage 
      const usuariosRegistrados =
        JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
      usuariosRegistrados.push(nuevoUsuario);
      localStorage.setItem(
        "usuariosRegistrados",
        JSON.stringify(usuariosRegistrados)
      );

      setRegistroExitoso(nuevoUsuario);

      // limpiar el formulario
      setFormData({
        run: "",
        nombre: "",
        apellidos: "",
        correo: "",
        reingresoCorreo: "",
        password: "",
        reingresoPassword: "",
        telefono: "",
        region: "",
        direccion: "",
      });
    }
  };

  return (
    <main>
      <div className="contenido-principal">
        <form id="registro" onSubmit={handleSubmit}>
          <h2>Registro</h2>

          {/* run */}
          <div className="campo">
            <label htmlFor="run">RUN / RUT (sin puntos ni guion)</label>
            <input
              type="text"
              id="run"
              name="run"
              maxLength="9"
              placeholder="Ej: 19011022K"
              value={formData.run}
              onChange={handleChange}
            />
          </div>

          {/* nombre */}
          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              maxLength="50"
              placeholder="Ej: Ana"
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          {/* apellidos */}
          <div className="campo">
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              maxLength="100"
              placeholder="Ej: Silva Pérez"
              value={formData.apellidos}
              onChange={handleChange}
            />
          </div>

          {/* correo */}
          <div className="campo">
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              id="correo"
              name="correo"
              maxLength="100"
              placeholder="Ej: ana@duoc.cl"
              value={formData.correo}
              onChange={handleChange}
            />
          </div>

          {/* reingreso correo */}
          <div className="campo">
            <label htmlFor="reingreso-correo">Reingrese Correo</label>
            <input
              type="email"
              id="reingreso-correo"
              name="reingresoCorreo"
              placeholder="Ej: ana@duoc.cl"
              value={formData.reingresoCorreo}
              onChange={handleChange}
            />
          </div>

          {/* contraseña */}
          <div className="campo">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Ej: 123456"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* reingreso contraseña */}
          <div className="campo">
            <label htmlFor="reingreso-password">Reingrese Contraseña</label>
            <input
              type="password"
              id="reingreso-password"
              name="reingresoPassword"
              placeholder="Ej: 123456"
              value={formData.reingresoPassword}
              onChange={handleChange}
            />
          </div>

          {/* teléfono */}
          <div className="campo">
            <label htmlFor="telefono">Teléfono (Opcional)</label>
            <input
              type="number"
              id="telefono"
              name="telefono"
              placeholder="Ej: 987654321"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>

          {/* región */}
          <div className="campo">
            <label htmlFor="region">Región</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="">Seleccione una región</option>
              <option value="arica">Región de Arica y Parinacota</option>
              <option value="tarapaca">Región de Tarapacá</option>
              <option value="antofagasta">Región de Antofagasta</option>
              <option value="atacama">Región de Atacama</option>
              <option value="coquimbo">Región de Coquimbo</option>
              <option value="valparaiso">Región de Valparaíso</option>
              <option value="rm">Región Metropolitana de Santiago</option>
              <option value="ohiggins">
                Región del Libertador General Bernardo O'Higgins
              </option>
              <option value="maule">Región del Maule</option>
              <option value="nuble">Región de Ñuble</option>
              <option value="biobio">Región del Biobío</option>
              <option value="araucania">Región de La Araucanía</option>
              <option value="los_rios">Región de Los Ríos</option>
              <option value="los_lagos">Región de Los Lagos</option>
              <option value="aysen">
                Región Aysén del General Carlos Ibáñez del Campo
              </option>
              <option value="magallanes">
                Región de Magallanes y de la Antártica Chilena
              </option>
            </select>
          </div>

          {/* dirección */}
          <div className="campo">
            <label htmlFor="direccion">Dirección de Entrega</label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              maxLength="300"
              placeholder="Ej: Av. Las Flores 1234"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-principal">
            Registrarse
          </button>
        </form>

        {/* zona para mensajes */}
        <div id="mensajes">
          {errores.length > 0 &&
            errores.map((error, index) => (
              <div key={index} className="error">
                ⚠️ {error}
              </div>
            ))}

          {registroExitoso && (
            <div className="exito">
              ✅ Registro realizado correctamente.
              <br />
              <br />
              <strong>RUN:</strong> {registroExitoso.run}
              <br />
              <strong>Nombre:</strong> {registroExitoso.nombre}{" "}
              {registroExitoso.apellidos}
              <br />
              <strong>Correo:</strong> {registroExitoso.correo}
              <br />
              <strong>Región:</strong> {registroExitoso.region}
              <br />
              <strong>Dirección:</strong> {registroExitoso.direccion}
              {registroExitoso.telefono && (
                <>
                  <br />
                  <strong>Teléfono:</strong> {registroExitoso.telefono}
                </>
              )}
            </div>
          )}
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

export default Registro;