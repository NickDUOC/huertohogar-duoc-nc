import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { cerrarSesion } from "../auth/auth.js";

// lista de usuarios iniciales
const usuariosIniciales = [
  {
    run: "19011022K",
    nombre: "Ana",
    apellidos: "Silva Pérez",
    correo: "ana@duoc.cl",
    tipoUsuario: "Administrador",
    region: "Región Metropolitana",
  },
  {
    run: "182345678",
    nombre: "Carlos",
    apellidos: "Mendoza Rojas",
    correo: "carlos@gmail.com",
    tipoUsuario: "Vendedor",
    region: "Región de Valparaíso",
  },
  {
    run: "201112223",
    nombre: "María",
    apellidos: "López Castro",
    correo: "m.lopez@profesor.duoc.cl",
    tipoUsuario: "Cliente",
    region: "Región del Maule",
  },
];

function AdminUsuarios({ setPaginaActual }) {
  // cargar desde localstorage o inicializar con los usuarios iniciales
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = localStorage.getItem("usuariosRegistrados");
    if (guardados) {
      try {
        return JSON.parse(guardados);
      } catch (e) {
        console.error("Error al leer usuarios de localStorage:", e);
      }
    }
    return usuariosIniciales;
  });

  // localstorage guardado
  useEffect(() => {
    localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
  }, [usuarios]);

  // cambiar tipo de usuario / rol
  const handleCambiarTipo = (run, nuevoTipo) => {
    setUsuarios((actuales) =>
      actuales.map((u) =>
        u.run === run ? { ...u, tipoUsuario: nuevoTipo } : u
      )
    );
  };

  // eliminar usuario
  const handleEliminar = (run) => {
    if (window.confirm(`¿Seguro que deseas eliminar al usuario con RUN ${run}?`)) {
      setUsuarios((actuales) => actuales.filter((u) => u.run !== run));
    }
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <div className="admin-page">
      {/* header del panel administrador*/}
      <header className="admin-header">
        <h2>Panel Administrador</h2>
        <nav>
          <NavLink to="/admin" end>Cambiar Productos</NavLink>
          <NavLink to="/admin/usuarios">Cambiar Usuarios</NavLink>
          <Link to="/" className="btn-secundario">Volver a la Tienda</Link>
          <button
            type="button"
            className="btn-secundario"
            onClick={handleLogout}
            style={{ backgroundColor: "#E74C3C", color: "#fff", cursor: "pointer" }}
          >
            Cerrar Sesión
          </button>
        </nav>
      </header>

      <div className="admin-container">
        <main className="content-admin" style={{ padding: "1.5rem" }}>
          <h1>Gestión de Usuarios</h1>

          <section className="tabla-seccion">
            <h2>Usuarios Registrados</h2>

            {usuarios.length === 0 ? (
              <p style={{ textAlign: "center", padding: "1rem" }}>
                No hay usuarios registrados.
              </p>
            ) : (
              <table
                border="1"
                id="tabla-usuarios"
                style={{
                  width: "100%",
                  textAlign: "left",
                  marginBottom: "2rem",
                  borderCollapse: "collapse",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f0f0f0" }}>
                    <th style={{ padding: "0.6rem" }}>RUN</th>
                    <th style={{ padding: "0.6rem" }}>Nombre Completo</th>
                    <th style={{ padding: "0.6rem" }}>Correo</th>
                    <th style={{ padding: "0.6rem" }}>Rol</th>
                    <th style={{ padding: "0.6rem" }}>Región</th>
                    <th style={{ padding: "0.6rem" }}>Acciones</th>
                  </tr>
                </thead>
                <tbody id="lista-usuarios">
                  {usuarios.map((usr) => (
                    <tr
                      key={usr.run}
                      style={{ borderBottom: "1px solid #ddd" }}
                    >
                      <td style={{ padding: "0.6rem" }}>{usr.run}</td>
                      <td style={{ padding: "0.6rem" }}>
                        {usr.nombre} {usr.apellidos}
                      </td>
                      <td style={{ padding: "0.6rem" }}>{usr.correo}</td>
                      <td style={{ padding: "0.6rem" }}>
                        <select
                          value={usr.tipoUsuario || "Cliente"}
                          onChange={(e) =>
                            handleCambiarTipo(usr.run, e.target.value)
                          }
                          style={{ padding: "0.3rem", borderRadius: "4px" }}
                        >
                          <option value="Administrador">Administrador</option>
                          <option value="Vendedor">Vendedor</option>
                          <option value="Cliente">Cliente</option>
                        </select>
                      </td>
                      <td style={{ padding: "0.6rem" }}>{usr.region}</td>
                      <td style={{ padding: "0.6rem" }}>
                        <button
                          type="button"
                          className="btn-secundario"
                          onClick={() => handleEliminar(usr.run)}
                          style={{
                            padding: "0.3rem 0.6rem",
                            fontSize: "0.85rem",
                            backgroundColor: "#E74C3C",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </main>
      </div>

      <footer>
        <p>© 2026 HuertoHogar - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default AdminUsuarios;
