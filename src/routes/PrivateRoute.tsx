import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../contexts/AuthContext';
import LoadingPage from '../components/Loading/LoadingPage';

const PrivateRoute: React.FC = () => {
    const { state, isAuthenticated } = useAuth();
    const [isAuthChecked, setIsAuthChecked] = useState(false); // Para saber se o token foi verificado

    // Verifica o cookie diretamente no PrivateRoute
    useEffect(() => {
        const token = Cookies.get('geniusToken');
        if (token) {
            isAuthenticated();
        }
        setIsAuthChecked(true);
    }, []);

    // Mostra o loading enquanto está verificando o token
    if (!isAuthChecked || state.isLoading) {
        return <LoadingPage />;
    }

    // Redireciona caso o usuário não esteja autenticado
    if (!isAuthenticated()) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;
