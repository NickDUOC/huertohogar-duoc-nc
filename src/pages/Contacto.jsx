import { useState } from "react";
import CarritoLateral from "../components/CarritoLateral";
import { validarTexto, validarCorreo } from "../utils/validaciones.js";

function Contacto({
  carrito,
  vaciarCarrito,
  comprar,
  agregarAlCarrito,
  disminuirCantidad,
  eliminarDelCarrito,
}) {
  // estados para los campos del formulario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [comentario, setComentario] = useState("");

  // estados para los mensajes de validación y confirmación
  const [errores, setErrores] = useState([]);
  const [exito, setExito] = useState("");

  // función de validación y envío
  const handleSubmit = (e) => {
    e.preventDefault(); // evita la recarga automática del navegador

    const nombreLimpio = nombre.trim();
    const correoLimpio = correo.trim();
    const comentarioLimpio = comentario.trim();
    const listaErrores = [];

    // validaciones de nombre con función pura
    if (!validarTexto(nombreLimpio, 1, 100)) {
      listaErrores.push("El nombre es obligatorio y no puede superar los 100 caracteres.");
    }

    // validaciones de correo con función pura
    if (!validarCorreo(correoLimpio)) {
      listaErrores.push("El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.");
    }

    // validaciones de comentario con función pura
    if (!validarTexto(comentarioLimpio, 1, 500)) {
      listaErrores.push("El mensaje es obligatorio y no puede superar los 500 caracteres.");
    }

    // actualización de estado según resultado
    if (listaErrores.length > 0) {
      setErrores(listaErrores);
      setExito("");
    } else {
      setErrores([]);
      setExito(`Gracias por contactarte con HuertoHogar, ${nombreLimpio}.`);
      // limpieza de campos controlados
      setNombre("");
      setCorreo("");
      setComentario("");
    }
  };

  return (
    <main>
      <div className="contenido-principal">
        <form id="form-contacto" onSubmit={handleSubmit}>
          <h2>Formulario de Contacto</h2>

          {/* campo nombre */}
          <div className="campo">
            <label htmlFor="nombre">Nombre Completo</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              maxLength="100"
              placeholder="Ej: Ana Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>

          {/* campo correo */}
          <div className="campo">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              maxLength="100"
              placeholder="Ej: ana@duoc.cl"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          {/* campo mensaje / comentario */}
          <div className="campo">
            <label htmlFor="comentario">Mensaje o Comentario</label>
            <textarea
              id="comentario"
              name="comentario"
              rows="5"
              maxLength="500"
              placeholder="Escriba su comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-principal">
            Enviar
          </button>

          {/* contenedor de alertas dinámicas */}
          <div id="mensajes">
            {errores.length > 0 &&
              errores.map((error, index) => (
                <div key={index} className="error">
                  ⚠️ {error}
                </div>
              ))}

            {exito && (
              <div className="exito">
                ✅ Mensaje enviado correctamente.
                <br />
                {exito}
              </div>
            )}
          </div>
        </form>
      </div>

      {/* componente reutilizable del carrito lateral */}
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

export default Contacto;