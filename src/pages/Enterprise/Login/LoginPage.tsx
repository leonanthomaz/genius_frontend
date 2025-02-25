import React from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, TextField, Paper, Stack, useMediaQuery, useTheme, Grid } from '@mui/material';
import { useMuiTheme } from '../../../styles/muiTheme';
import GoogleIcon from '@mui/icons-material/Google';
import LoginImage from '@/assets/img/logo-sf.png';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const theme = useMuiTheme();
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

  const handleLogin = () => {
    login();
    navigate('/dashboard');
  };

  const handleGoogleLogin = () => {
    console.log('Login com Google');
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
              // background: '#f4f4f4'
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>

            <TextField label="Email" variant="outlined" fullWidth margin="normal" />
            <TextField label="Senha" variant="outlined" type="password" fullWidth margin="normal" />

            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: theme.spacing(3), fontWeight: 'bold', fontSize: '1.1rem' }}
              onClick={handleLogin}
            >
              Entrar
            </Button>

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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;