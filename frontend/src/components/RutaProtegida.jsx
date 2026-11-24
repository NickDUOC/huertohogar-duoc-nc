import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function RutaProtegida({ children, exigirAdmin = false }) {
    const { user, usuario, loading, cargando, esAdmin } = useAuth();
    const location = useLocation();

    const estaCargando = loading || cargando;
    const usuarioActivo = user || usuario;

    if (estaCargando) {
        return (
            <div style={{ textAlign: "center", padding: "3rem" }}>
                <p>Verificando sesión con el servidor...</p>
            </div>
        );
    }

    if (!usuarioActivo) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    const esAdministrador = esAdmin || usuarioActivo.rol === 'ADMIN' || usuarioActivo.rol === 'ROLE_ADMIN';

    if (exigirAdmin && !esAdministrador) {
        alert("Acceso denegado: se requieren permisos de Administrador.");
        return <Navigate to="/" replace />;
    }

    return children;
}