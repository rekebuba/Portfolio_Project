import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/v1/users/${getCookie('user_id')}`)
            .then(response => {
                setAuthenticated(response.data.authenticated);
            })
            .catch(() => {
                setAuthenticated(false);
            });
    }, []);

    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Function to erase a cookie
    function eraseCookie(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }


    const signUp = (userObject) => {
        return axios.post('http://127.0.0.1:5000/api/v1/user/login', userObject)
            .then(response => {
                console.log(response.data)
                setAuthenticated(true);
                setCookie('user_id', response.data.id, 7);
                return response;
            });
    };

    const logout = () => {
        return axios.post(`http://localhost:5000/api/v1/user/logout/${getCookie('user_id')}`, {})
            .then(response => {
                setAuthenticated(false);
                eraseCookie('user_id')
                return response;
            });
    };

    return (
        <AuthContext.Provider value={{ authenticated, signUp, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
