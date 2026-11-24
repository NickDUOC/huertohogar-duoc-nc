import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getProductos, crearProducto, actualizarProducto, eliminarProducto } from '../services/productoService.js';

const FORM_INICIAL = {
    codigo: '',
    nombre: '',
    categoria: 'Frutas',
    precio: 0,
    stock: 0,
    unidad: 'Kilo',
    descripcion: ''
};

export default function AdminHome() {
    const { token, logout } = useAuth();
    const [productos, setProductos] = useState([]);
    const [form, setForm] = useState(FORM_INICIAL);
    const [editandoId, setEditandoId] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

    const cargarProductos = useCallback(async () => {
        setCargando(true);
        try {
            const data = await getProductos();
            setProductos(data || []);
        } catch (err) {
            setMensaje({ tipo: 'danger', texto: err.message || 'Error al cargar los productos' });
        } finally {
            setCargando(false);
        }
    }, []);

    useEffect(() => {
        cargarProductos();
    }, [cargarProductos]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: name === 'precio' || name === 'stock' ? Number(value) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje({ tipo: '', texto: '' });

        try {
            if (editandoId) {
                await actualizarProducto(editandoId, form, token);
                setMensaje({ tipo: 'success', texto: 'Producto actualizado con éxito en Spring Boot.' });
            } else {
                await crearProducto(form, token);
                setMensaje({ tipo: 'success', texto: 'Producto registrado exitosamente en la Base de Datos.' });
            }
            setForm(FORM_INICIAL);
            setEditandoId(null);
            cargarProductos();
        } catch (err) {
            if (err.status === 401 || err.status === 403) {
                logout();
            } else {
                setMensaje({ tipo: 'danger', texto: err.message || 'Error al procesar la solicitud' });
            }
        }
    };

    const handleEditar = (prod) => {
        setEditandoId(prod.id);
        setForm({
            codigo: prod.codigo || '',
            nombre: prod.nombre || '',
            categoria: prod.categoria || 'Frutas',
            precio: prod.precio || 0,
            stock: prod.stock || 0,
            unidad: prod.unidad || 'Kilo',
            descripcion: prod.descripcion || ''
        });
        setMensaje({ tipo: 'info', texto: `Editando producto ID: ${prod.id}` });
    };

    const handleEliminar = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este producto del catálogo?')) return;
        setMensaje({ tipo: '', texto: '' });

        try {
            await eliminarProducto(id, token);
            setMensaje({ tipo: 'success', texto: 'Producto eliminado exitosamente.' });
            cargarProductos();
        } catch (err) {
            if (err.status === 401 || err.status === 403) {
                logout();
            } else {
                setMensaje({ tipo: 'danger', texto: err.message || 'Error al eliminar el producto' });
            }
        }
    };

    const handleCancelar = () => {
        setForm(FORM_INICIAL);
        setEditandoId(null);
        setMensaje({ tipo: '', texto: '' });
    };

    return (
        <main className="container my-5">
            <h1 className="mb-4">Mantenedor de Productos (Administrador)</h1>

            {mensaje.texto && (
                <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show`} role="alert">
                    {mensaje.texto}
                    <button type="button" className="btn-close" onClick={() => setMensaje({ tipo: '', texto: '' })}></button>
                </div>
            )}

            <div className="row g-4">
                {/* Formulario Crear / Editar */}
                <div className="col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-header bg-success text-white">
                            <h5 className="card-title mb-0">
                                {editandoId ? 'Editar Producto' : 'Nuevo Producto'}
                            </h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Código</label>
                                    <input type="text" name="codigo" className="form-control" value={form.codigo} onChange={handleChange} required placeholder="Ej: FR001" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" name="nombre" className="form-control" value={form.nombre} onChange={handleChange} required placeholder="Ej: Manzanas Fuji" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Categoría</label>
                                    <select name="categoria" className="form-select" value={form.categoria} onChange={handleChange}>
                                        <option value="Frutas">Frutas</option>
                                        <option value="Verduras">Verduras</option>
                                        <option value="Hortalizas">Hortalizas</option>
                                        <option value="Orgánicos">Orgánicos</option>
                                    </select>
                                </div>
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Precio ($)</label>
                                        <input type="number" name="precio" className="form-control" value={form.precio} onChange={handleChange} required min="0" />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <label className="form-label">Stock</label>
                                        <input type="number" name="stock" className="form-control" value={form.stock} onChange={handleChange} required min="0" />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Unidad</label>
                                    <input type="text" name="unidad" className="form-control" value={form.unidad} onChange={handleChange} placeholder="Ej: Kilo, Malla, Unidad" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <textarea name="descripcion" className="form-control" rows="2" value={form.descripcion} onChange={handleChange}></textarea>
                                </div>
                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-success flex-grow-1">
                                        {editandoId ? 'Guardar Cambios' : 'Crear Producto'}
                                    </button>
                                    {editandoId && (
                                        <button type="button" className="btn btn-secondary" onClick={handleCancelar}>
                                            Cancelar
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Tabla de Productos */}
                <div className="col-lg-7">
                    <div className="card shadow-sm">
                        <div className="card-header bg-light">
                            <h5 className="card-title mb-0">Catálogo Persistente en Spring Boot</h5>
                        </div>
                        <div className="card-body p-0">
                            {cargando ? (
                                <p className="p-3 text-center">Cargando productos...</p>
                            ) : productos.length === 0 ? (
                                <p className="p-3 text-center text-muted">No hay productos guardados.</p>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle mb-0">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Cód.</th>
                                                <th>Nombre</th>
                                                <th>Precio</th>
                                                <th>Stock</th>
                                                <th className="text-end">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {productos.map(p => (
                                                <tr key={p.id}>
                                                    <td><code>{p.codigo}</code></td>
                                                    <td>{p.nombre}</td>
                                                    <td>${p.precio?.toLocaleString('es-CL')}</td>
                                                    <td>{p.stock}</td>
                                                    <td className="text-end">
                                                        <button className="btn btn-sm btn-outline-primary me-1" onClick={() => handleEditar(p)}>
                                                            Editar
                                                        </button>
                                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminar(p.id)}>
                                                            Eliminar
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}