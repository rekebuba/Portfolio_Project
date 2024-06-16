import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/users/auth', { withCredentials: true })
            .then(response => {
                setAuthenticated(response.data.authenticated);
            })
            .catch(() => {
                setAuthenticated(false);
            });
    }, []);

    const login = (userObject) => {
        return axios.post('http://127.0.0.1:5000/api/v1/users', userObject, { withCredentials: true })
            .then(response => {
                setAuthenticated(true);
                return response;
            });
    };

    const logout = () => {
        return axios.post('http://localhost:5000/api/v1/logout', {}, { withCredentials: true })
            .then(response => {
                setAuthenticated(false);
                return response;
            });
    };

    return (
        <AuthContext.Provider value={{ authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
