import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

import HomePage from '../pages/Enterprise/HomePage';
import ServicePage from '../pages/Enterprise/ServicesPage';
import ContactPage from '../pages/Enterprise/ContactPage';
import LoginPage from '../pages/Enterprise/Login/LoginPage';

import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
import WhatsappPage from '../pages/Dashboard/WhatsappPage';
import FinancePage from '../pages/Dashboard/FinancePage';
import AnalyticsPage from '../pages/Dashboard/AnalyticsPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import SettingsPage from '../pages/Dashboard/SettingsPage';

import NotFoundPage from '../pages/NotFoundPage';

import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import ChatPage from '../pages/Enterprise/ChatPage';
import ServiceAdminPage from '../pages/Dashboard/ServiceAdminPage';

const AppRoute: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AuthProvider>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard"
            element={
              <>
                <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                <Box component="main"
                  sx={{
                    flexGrow: 1,
                    p: 0,
                    width: { sm: `calc(100% - 200px)` },
                    ml: { sm: '200px' },
                  }}
                >
                  <Navbar handleDrawerToggle={handleDrawerToggle} />
                  <Outlet />
                </Box>
              </>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="/dashboard/whatsapp" element={<WhatsappPage />} />
            <Route path="/dashboard/analytics" element={<AnalyticsPage />} />
            <Route path="/dashboard/finance" element={<FinancePage />} />
            <Route path="/dashboard/services" element={<ServiceAdminPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </AuthProvider>
  );
};

export default AppRoute;
