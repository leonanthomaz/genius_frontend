// src/components/Navbar/index.tsx

import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/assets/img/logo-sf.png';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bgColor, setBgColor] = useState('transparent');
  const location = useLocation();

  const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);

  useEffect(() => {
    const handleScroll = () => {
      setBgColor(window.scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'transparent');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { to: '/', label: 'Home', icon: <HomeIcon /> },
    { to: '/services', label: 'Serviços', icon: <BuildIcon /> },
    { to: '/contact', label: 'Contato', icon: <ContactMailIcon /> },
    { to: '/login', label: 'Login', icon: <ContactMailIcon /> },
  ];

  const list = (
    <Box sx={{ width: 250, display: 'flex', flexDirection: 'column', height: '100%' }} role="presentation">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider /> {/* Adiciona o divisor */}
      <List sx={{ flexGrow: 1, paddingTop: '20px' }}> {/* Adiciona padding ao topo */}
        {links.map(({ to, label, icon }) => (
          <ListItem key={to} disablePadding>
            <ListItemButton component={Link} to={to}>
              <Box sx={{ marginRight: '10px' }}>{icon}</Box> {/* Adiciona o ícone */}
              <ListItemText primary={label} primaryTypographyProps={{ style: { fontSize: '1.2rem' } }} /> {/* Aumenta a fonte */}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ background: bgColor, transition: 'background 0.3s ease-in-out' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img src={Logo} alt="Logo" style={{ height: '100px', marginRight: '12px' }} />
            <Typography variant="h6">Sua Empresa</Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {links.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                style={{
                  fontSize: '1.2rem',
                  color: 'inherit',
                  textDecoration: 'none',
                  marginLeft: '20px',
                  borderBottom: location.pathname === to ? '2px solid #1976D2' : 'none',
                }}
              >
                {label}
              </Link>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {list}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;