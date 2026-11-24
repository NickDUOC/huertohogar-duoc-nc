import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const data = await login(form.username, form.password);
            if (data.rol === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/productos');
            }
        } catch (err) {
            setError(err.message || 'Usuario o contraseña incorrectos');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>

                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Correo / Usuario</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        value={form.username}
                                        onChange={handleChange}
                                        placeholder="ej: admin@duoc.cl"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                    disabled={submitting}
                                >
                                    {submitting ? 'Verificando...' : 'Ingresar'}
                                </button>
                            </form>
                            <div className="mt-3 text-muted small">
                                <p className="mb-1"><strong>Cuentas de prueba Spring Boot:</strong></p>
                                <ul>
                                    <li>Admin: admin@duoc.cl / admin</li>
                                    <li>Cliente: cliente@duoc.cl / cliente123</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}