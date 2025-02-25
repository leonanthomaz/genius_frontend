// src/routes/index.tsx

import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import HomePage from '../pages/Public/HomePage';
import NotFoundPage from '../pages/Public/NotFoundPage';
import ServicePage from '../pages/Public/ServicesPage';
import ContactPage from '../pages/Public/ContactPage';
import LoginPage from '../pages/Public/Login/LoginPage';

import Sidebar from '../components/Dashboard/Sidebar';
import Navbar from '../components/Dashboard/Navbar';
import WhatsappPage from '../pages/Private/WhatsappPage';
import FinancePage from '../pages/Private/FinancePage';
import AnalyticsPage from '../pages/Private/AnalyticsPage';
import DashboardPage from '../pages/Private/DashboardPage';
import SettingsPage from '../pages/Private/SettingsPage';

import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

const AppRoute: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AuthProvider>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage />} />

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
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </AuthProvider>
  );
};

export default AppRoute;