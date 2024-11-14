// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser({ token });
        }
    }, []);

    const signup = async (data) => {
        const res = await API.post('/auth/signup', data);
        localStorage.setItem('token', res.data.token);
        setUser({ token: res.data.token });
    };

    const login = async (data) => {
        const res = await API.post('/auth/login', data);
        localStorage.setItem('token', res.data.token);
        setUser({ token: res.data.token });
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
