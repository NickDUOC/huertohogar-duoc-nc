import logoImg from "../assets/img/logo.png";
import { NavLink } from "react-router-dom";

function Header({ cantidadCarrito = 0 }) {
  return (
    <header>
      <NavLink to="/" end>
        <img src={logoImg} alt="logo" />
      </NavLink>

      <nav>
        <NavLink to="/" end>
          Inicio
        </NavLink>
        <NavLink to="/productos">
          Productos
        </NavLink>
        <NavLink to="/login">
          Login
        </NavLink>
        <NavLink to="/registro">
          Registro
        </NavLink>
        <NavLink to="/blog">
          Blog
        </NavLink>
        <NavLink to="/contacto">
          Contacto
        </NavLink>
        <span id="contador-carrito">🛒 Carrito ({cantidadCarrito})</span>
      </nav>
    </header>
  );
}

export default Header;