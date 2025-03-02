// src/components/Sidebar/index.tsx

import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Divider, Box, Avatar, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Logo from '@/assets/img/logo_oficial_sem_fundo.png';
import React from "react";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const StyledListItemButton = styled(ListItemButton)<{ component?: React.ElementType }>(
  ({ theme }) => ({
    paddingLeft: theme.spacing(3),
    '& .MuiListItemIcon-root': {
      minWidth: theme.spacing(4),
      marginRight: theme.spacing(1),
    },
  })
);


const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <Avatar alt="Logo da Empresa" src={Logo} sx={{ width: 100, height: 100 }} />
      </Box>
      <List>
        {[{
          text: 'Dashboard',
          to: '/dashboard',
          icon: <DashboardIcon />
        }, {
          text: 'Whatsapp',
          to: '/dashboard/whatsapp',
          icon: <WhatsAppIcon />
        }, {
          text: 'Estatísticas',
          to: '/dashboard/analytics',
          icon: <BarChartIcon />
        }, {
          text: 'Financeiro',
          to: '/dashboard/finance',
          icon: <AttachMoneyIcon />
        }, {
          text: 'Configurações',
          to: '/dashboard/settings',
          icon: <SettingsIcon />
        }].map(({ text, to, icon }) => (
          <Link key={to} to={to} onClick={() => {
            handleDrawerToggle();
            document.body.style.overflow = 'auto';
        }}>
            <StyledListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </StyledListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 200,
            boxSizing: 'border-box',
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        disableScrollLock={true} // Aqui tá a mágica
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>

    </>
  );
};

export default Sidebar;
