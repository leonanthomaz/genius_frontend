import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute: React.FC = () => {
  const { state } = useAuth();

  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!state.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Se o usuário for autenticado mas não for admin, renderiza o conteúdo do dashboard
  return <Outlet />;
};

export default PrivateRoute;
