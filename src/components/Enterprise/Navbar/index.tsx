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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/assets/img/logo-sf.png';
import { useAuth } from '../../../contexts/AuthContext';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [bgColor, setBgColor] = useState('transparent');
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setBgColor(window.scrollY > 50 ? 'rgba(255, 255, 255, 0.95)' : 'transparent');
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLoginClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        if (isAuthenticated()) {
            logout();
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown') {
          const keyboardEvent = event as React.KeyboardEvent;
          if (keyboardEvent.key === 'Tab' || keyboardEvent.key === 'Shift') {
              return;
          }
      }
      setDrawerOpen(open);
  };

    const list = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
                <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/">
                        <HomeIcon sx={{ marginRight: '8px' }} />
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/services">
                        <BuildIcon sx={{ marginRight: '8px' }} />
                        <ListItemText primary="Serviços" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/contact">
                        <ContactMailIcon sx={{ marginRight: '8px' }} />
                        <ListItemText primary="Contato" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component="a" onClick={handleLoginClick}> {/* Correção aqui */}
                        {isAuthenticated() ? <LogoutIcon sx={{ marginRight: '8px' }} /> : <LoginIcon sx={{ marginRight: '8px' }} />}
                        <ListItemText primary={isAuthenticated() ? 'Logout' : 'Login'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <AppBar position="fixed" sx={{ background: bgColor, transition: 'background 0.3s ease-in-out' }}>
            <Container maxWidth="lg">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={Logo} alt="Logo" style={{ height: '100px', marginRight: '12px' }} />
                        <Typography variant="h6">Genius</Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Link
                            to="/"
                            style={{
                                fontSize: '1.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                marginLeft: '20px',
                                borderBottom: location.pathname === '/' ? '2px solid #1976D2' : 'none',
                            }}
                        >
                            <HomeIcon style={{ marginRight: '5px' }} /> Home
                        </Link>
                        <Link
                            to="/services"
                            style={{
                                fontSize: '1.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                marginLeft: '20px',
                                borderBottom: location.pathname === '/services' ? '2px solid #1976D2' : 'none',
                            }}
                        >
                            <BuildIcon style={{ marginRight: '5px' }} /> Serviços
                        </Link>
                        <Link
                            to="/contact"
                            style={{
                                fontSize: '1.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                marginLeft: '20px',
                                borderBottom: location.pathname === '/contact' ? '2px solid #1976D2' : 'none',
                            }}
                        >
                            <ContactMailIcon style={{ marginRight: '5px' }} /> Contato
                        </Link>
                        <Link
                            to={isAuthenticated() ? '/' : '/login'}
                            style={{
                                fontSize: '1.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                marginLeft: '20px',
                                borderBottom: location.pathname === '/login' ? '2px solid #1976D2' : 'none',
                            }}
                            onClick={handleLoginClick}
                        >
                            {isAuthenticated() ? <LogoutIcon style={{ marginRight: '5px' }} /> : <LoginIcon style={{ marginRight: '5px' }} />}
                            {isAuthenticated() ? 'Logout' : 'Login'}
                        </Link>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton onClick={toggleDrawer(true)}>
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