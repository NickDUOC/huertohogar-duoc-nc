import logoImg from "../assets/img/logo.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Header({ cantidadCarrito = 0 }) {
  const { user, usuario, logout, esAdmin } = useAuth();
  const usuarioActivo = user || usuario;
  const esAdministrador = esAdmin || usuarioActivo?.rol === 'ADMIN' || usuarioActivo?.rol === 'ROLE_ADMIN';

  return (
    <header>
      <NavLink to="/" end>
        <img src={logoImg} alt="logo" />
      </NavLink>

      <nav>
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/productos">Productos</NavLink>
        <NavLink to="/blog">Blog</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        
        {usuarioActivo ? (
          <>
            {esAdministrador && <NavLink to="/admin">Admin</NavLink>}
            <span className="usuario-tag" style={{ color: '#2E8B57', fontWeight: 'bold' }}>
              👤 {usuarioActivo.username || usuarioActivo.usuario}
            </span>
            <button onClick={logout} className="btn-logout-header" style={{ marginLeft: '10px' }}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/registro">Registro</NavLink>
          </>
        )}

        <span id="contador-carrito">🛒 Carrito ({cantidadCarrito})</span>
      </nav>
    </header>
  );
}

export default Header;