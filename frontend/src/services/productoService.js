import { request } from './api.js';

export async function getProductos() {
    return await request('/api/productos');
}

export async function obtenerProductos() {
    return await getProductos();
}

export async function obtenerProductosAPI() {
    return await getProductos();
}

export async function getProductoPorId(id) {
    return await request(`/api/productos/${id}`);
}

export async function crearProducto(producto, token) {
    return await request('/api/productos', {
        method: 'POST',
        body: producto,
        token,
    });
}

export async function actualizarProducto(id, producto, token) {
    return await request(`/api/productos/${id}`, {
        method: 'PUT',
        body: producto,
        token,
    });
}

export async function eliminarProducto(id, token) {
    return await request(`/api/productos/${id}`, {
        method: 'DELETE',
        token,
    });
}
