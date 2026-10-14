import { Navigate } from "react-router-dom";
import { estaAutenticado, esAdmin } from "../auth/auth.js";

/**
 * componente guardián de rutas
 * si no hay sesión activa, redirige automáticamente a /login con el replace
 * si la ruta exige rol de admin y el usuario no lo tiene, redirige a main /.
 */
export default function RutaProtegida({ children, exigirAdmin = true }) {
  if (!estaAutenticado()) {
    return <Navigate to="/login" replace />;
  }

  if (exigirAdmin && !esAdmin()) {
    alert("Acceso denegado: se requieren permisos de Administrador.");
    return <Navigate to="/" replace />;
  }

  return children;
}
