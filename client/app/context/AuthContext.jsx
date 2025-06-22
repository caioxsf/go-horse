'use client'

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    function login(obj) {
        setUsuario(obj);
        if (typeof window !== 'undefined') {
            localStorage.setItem("usuario", JSON.stringify(obj));
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = localStorage.getItem("usuario");
            if (user) {
                setUsuario(JSON.parse(user));
            }
        }
    }, []);

    function logout() {
        if (typeof window !== 'undefined') {
            localStorage.removeItem("jwt");
            localStorage.removeItem("jwt_token");
            localStorage.removeItem("user")
            localStorage.removeItem("usuario");
            window.location.href = '/';
        }
    }



    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth deve ser usado dentro do AuthProvider');
    return context;
}
