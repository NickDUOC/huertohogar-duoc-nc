import React from 'react';
import { Link } from 'react-router-dom';

export default function SinPermiso() {
    return (
        <main className="container text-center my-5 py-5">
            <h1 className="display-3 text-danger fw-bold">403</h1>
            <h2 className="mb-3">Acceso Restringido</h2>
            <p className="lead text-muted mb-4">
                Tu cuenta no posee los permisos de Administrador necesarios para acceder a esta sección.
            </p>
            <Link to="/productos" className="btn btn-success">
                Volver al Catálogo de Productos
            </Link>
        </main>
    );
}