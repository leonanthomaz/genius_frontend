// src/components/Dashboard/Navbar/index.tsx

import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';

interface NavbarProps {
    handleDrawerToggle: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ handleDrawerToggle }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { getUser, state, logout, isAuthenticated } = useAuth(); // Obtém o state
    const user = getUser(); // Obtenha o usuário

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        handleMenuClose();
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - 200px)` },
                height: 'auto',
                padding: '5px',
                ml: { sm: '240px' },
                justifyContent: 'center',
            }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ mr: 2, display: { sm: 'none' } }}
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    {state.user ? state.user.company.name : 'Dashboard'} {/* Acessa o user através do state */}
                </Typography>

                <Button
                    color="inherit"
                    startIcon={<AccountCircle />}
                    onClick={handleMenuOpen}
                    sx={{ textTransform: 'none' }}
                >
                    {state.user ? state.user.user.username : 'Perfil'} {/* Acessa o user através do state */}
                </Button>

                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    {isAuthenticated() ? (
                        <MenuItem onClick={handleLogout}>
                            <Logout sx={{ mr: 1 }} />
                            Logout
                        </MenuItem>
                    ) : (
                        <MenuItem>
                            <AccountCircle sx={{ mr: 1 }} />
                            Login
                        </MenuItem>
                    )}
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;