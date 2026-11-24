import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { request } from '../services/api.js';

const AuthContext = createContext(null);
const TOKEN_KEY = 'hh_jwt_token';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => sessionStorage.getItem(TOKEN_KEY) || null);
    const [loading, setLoading] = useState(true);

    const checkAuth = useCallback(async () => {
        const savedToken = sessionStorage.getItem(TOKEN_KEY);
        if (!savedToken) {
            setUser(null);
            setToken(null);
            setLoading(false);
            return;
        }

        try {
            const data = await request('/auth/me', { token: savedToken });
            setUser({ username: data.username, rol: data.rol });
            setToken(savedToken);
        } catch (error) {
            sessionStorage.removeItem(TOKEN_KEY);
            setUser(null);
            setToken(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const login = async (username, password) => {
        const data = await request('/auth/login', {
            method: 'POST',
            body: { username, password },
        });

        sessionStorage.setItem(TOKEN_KEY, data.token);
        setToken(data.token);
        setUser({ username: data.username, rol: data.rol });
        return data;
    };

    const logout = () => {
        sessionStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
    };

    const esAdmin = user?.rol === 'ADMIN' || user?.rol === 'ROLE_ADMIN';
    const usuario = user;
    const cargando = loading;

    return (
        <AuthContext.Provider value={{ user, usuario, token, login, logout, loading, cargando, esAdmin, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
}