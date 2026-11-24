const API_BASE_URL = 'http://localhost:8080';

export async function request(endpoint, options = {}) {
    const { token, body, headers = {}, method = 'GET', ...customConfig } = options;

    const config = {
        method,
        headers: { ...headers },
        ...customConfig,
    };

    if (body) {
        config.headers['Content-Type'] = 'application/json';
        config.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        if (response.status === 204) return null;

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            const errorMessage = data?.message || `Error HTTP ${response.status}`;
            const error = new Error(errorMessage);
            error.status = response.status;
            throw error;
        }

        return data;
    } catch (error) {
        if (!error.status) {
            error.message = 'No se pudo conectar con el servidor Spring Boot (http://localhost:8080).';
        }
        throw error;
    }
}