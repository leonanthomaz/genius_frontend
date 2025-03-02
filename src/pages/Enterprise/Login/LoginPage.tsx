import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Paper, useMediaQuery, useTheme, Grid, Stack, CircularProgress, Divider } from '@mui/material';
import { useMuiTheme } from '../../../styles/muiTheme';
import GoogleIcon from '@mui/icons-material/Google';
import LoginImage from '@/assets/img/robot-smart-rf.png';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const theme = useMuiTheme();
    const muiTheme = useTheme();
    const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false); // Estado para o loading

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleLogin = async () => {
        setIsLoading(true); // Ativa o loading
        try {
            let response = await login(username, password);
            console.log(response);
            navigate('/dashboard');
        } catch (error) {
            toast.error("Erro ao fazer login. Verifique suas credenciais");
        } finally {
            setIsLoading(false); // Desativa o loading
        }
    };

    const handleGoogleLogin = async () => {
        try {
            // Dados mocados para o Google Login
            const mockGoogleResponse = {
                credential: 'mocked_google_token',
            };
            await loginWithGoogle(mockGoogleResponse.credential);
            navigate('/dashboard');
        } catch (error) {
            toast.error("Erro ao fazer login com google");
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: isSmallScreen ? 'linear-gradient(135deg, #d2e8ff 30%, #a8f0fa 70%)' : 'linear-gradient(to right, #d0eff5 40%, #ffffff 60%)',
                padding: theme.spacing(3),
            }}
        >
            <Grid container spacing={0} justifyContent="center" alignItems="stretch" sx={{ width: '100%', maxWidth: '1200px' }}>
                {!isSmallScreen && (
                    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', padding: theme.spacing(4) }}>
                        <Box
                            component="img"
                            src={LoginImage}
                            alt="Imagem Minimalista"
                            sx={{ maxWidth: '100%', maxHeight: '400px' }}
                        />
                    </Grid>
                )}

                <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Paper
                        elevation={3}
                        sx={{
                            padding: theme.spacing(4),
                            width: '100%',
                            maxWidth: '400px',
                            mx: 'auto',
                            borderRadius: theme.spacing(1),
                        }}
                    >
                        <Typography variant="h4" align="center" gutterBottom>
                            Login
                        </Typography>

                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <TextField
                            label="Senha"
                            variant="outlined"
                            type="password"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={handlePasswordChange}
                        />

                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ marginTop: theme.spacing(3), fontWeight: 'bold', fontSize: '1.1rem' }}
                            onClick={handleLogin}
                            disabled={isLoading} // Desabilita o botão durante o loading
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Entrar'}
                        </Button>

                        {/* Divisão "OU" */}
                        <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
                            <Divider sx={{ flexGrow: 1 }} />
                            <Typography variant="body2" sx={{ mx: 2, color: 'text.secondary' }}>
                                OU
                            </Typography>
                            <Divider sx={{ flexGrow: 1 }} />
                        </Box>

                        <Stack justifyContent="center" sx={{ marginTop: theme.spacing(2) }}>
                            <Button
                                variant="outlined"
                                onClick={handleGoogleLogin}
                                startIcon={<GoogleIcon />}
                                sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                            >
                                Entrar com Google
                            </Button>
                        </Stack>

                        {/* Link para voltar à página inicial */}
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="body2">
                                <Link to="/" style={{ textDecoration: 'none', color: theme.palette.primary.main }}>
                                    Voltar à página inicial
                                </Link>
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginPage;