// src/routes/AdminRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AdminRoute: React.FC = () => {
  const { state } = useAuth();

  // Se o usuário não for autenticado ou não for admin, redireciona para o dashboard
  if (!state.isAuthenticated || !state.user?.is_admin) {
    return <Navigate to="/dashboard" replace />;
  }

  // Se o usuário for admin, renderiza a página de admin
  return <Outlet />;
};

export default AdminRoute;
