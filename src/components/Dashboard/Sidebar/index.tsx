import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Avatar,
  styled,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BuildIcon from '@mui/icons-material/Build';
import SettingsIcon from '@mui/icons-material/Settings';
import Logo from '@/assets/img/logo_oficial_sem_fundo.png';
import React from "react";

interface SidebarProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: theme.spacing(3),
  '& .MuiListItemIcon-root': {
      minWidth: theme.spacing(4),
      marginRight: theme.spacing(1),
  },
}));

const menuItems = [
  { text: 'Dashboard', to: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Whatsapp', to: '/dashboard/whatsapp', icon: <WhatsAppIcon /> },
  { text: 'Estatísticas', to: '/dashboard/analytics', icon: <BarChartIcon /> },
  { text: 'Financeiro', to: '/dashboard/finance', icon: <AttachMoneyIcon /> },
  { text: 'Serviços', to: '/dashboard/services', icon: <BuildIcon /> },
  { text: 'Configurações', to: '/dashboard/settings', icon: <SettingsIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const drawer = (
      <Box sx={{ overflow: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <Avatar alt="Logo da Empresa" src={Logo} sx={{ width: 100, height: 100 }} />
          </Box>
          <List>
              {menuItems.map(({ text, to, icon }) => (
                  <Link key={to} to={to} onClick={() => isSmallScreen && handleDrawerToggle()}>
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
                  width: 200,
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
              ModalProps={{
                  keepMounted: true, // Melhor para SEO
              }}
              sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': {
                      width: 200,
                  },
              }}
          >
              {drawer}
          </Drawer>
      </>
  );
};

export default Sidebar;