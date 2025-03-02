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
    Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import BuildIcon from '@mui/icons-material/Build';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '@/assets/img/logo_oficial.png';
import { useAuth } from '../../../contexts/AuthContext';
import React from 'react';

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout, isAuthenticated } = useAuth();

    useEffect(() => {
        let prevScrollPos = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const scrollingDown = prevScrollPos < currentScrollPos;

            setIsVisible(!scrollingDown || currentScrollPos <= 50);
            prevScrollPos = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLoginClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
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
        <Box sx={{ width: 250, height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#e0f7fa' }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
            <Box sx={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <img src={Logo} alt="Logo" style={{ height: '50px', marginRight: '8px', borderRadius: '50%' }} />
                    <Typography variant="h6">Genius</Typography>
                </Box>
                <IconButton onClick={toggleDrawer(false)}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <Divider />
            <List sx={{ flexGrow: 1 }}>
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
            </List>
            <Divider />
            <Box sx={{ padding: '16px' }}>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    component={Link}
                    to={isAuthenticated() ? '/' : '/login'}
                    >
                    {isAuthenticated() ? 'Logout' : 'Entrar'}
                </Button>
            </Box>
        </Box>
    );

    return (
        <AppBar
            position="fixed"
            sx={{
                background: 'white',
                transition: 'top 0.3s ease-in-out',
                top: isVisible ? '0' : '-100px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                        <a href="/">
                            <img src={Logo} alt="Logo" style={{ height: '90px', marginRight: '12px', borderRadius: '50%' }} />
                        </a>
                        <Typography variant="h6">Genius</Typography>
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex', justifyContent: 'center', alignItems: 'center' } }}>
                        <Link
                            to="/"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1rem',
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
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1rem',
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
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1rem',
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
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1rem',
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
                        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                            {list}
                        </Drawer>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;