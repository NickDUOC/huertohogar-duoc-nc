import React, { useEffect, useState } from 'react';
import { getProductos } from '../services/productoService.js';

export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function cargarData() {
            try {
                const data = await getProductos();
                setProductos(data || []);
            } catch (err) {
                setError('No se pudieron cargar los productos desde la API REST.');
            } finally {
                setCargando(false);
            }
        }
        cargarData();
    }, []);

    if (cargando) {
        return <div className="container text-center my-5"><p>Cargando catálogo desde Spring Boot...</p></div>;
    }

    if (error) {
        return <div className="container my-5"><div className="alert alert-warning">{error}</div></div>;
    }

    return (
        <main className="container my-5">
            <h1 className="mb-4 text-center">Nuestros Productos Orgánicos</h1>
            <div className="row g-4">
                {productos.map((prod) => (
                    <div className="col-12 col-md-6 col-lg-4" key={prod.id}>
                        <div className="card h-100 shadow-sm">
                            <div className="card-body">
                                <span className="badge bg-success mb-2">{prod.categoria || 'Huerto'}</span>
                                <h5 className="card-title">{prod.nombre}</h5>
                                <p className="text-muted small">Código: {prod.codigo}</p>
                                <p className="card-text">{prod.descripcion || 'Producto fresco cosechado localmente.'}</p>
                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <span className="fs-4 fw-bold text-success">${prod.precio?.toLocaleString('es-CL')}</span>
                                    <span className="small text-muted">Stock: {prod.stock} {prod.unidad || 'unidades'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}