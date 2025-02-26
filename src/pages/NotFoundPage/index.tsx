import React from 'react';
import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useMuiTheme } from '../../styles/muiTheme';
import LoginImage from '@/assets/img/robot-sad.png';

const NotFoundPage: React.FC = () => {
  const theme = useMuiTheme();
  const muiTheme = useTheme();
  const isSmallScreen = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(to right, #f5d0d0 40%, #ffffff 60%)',
        padding: theme.spacing(3),
      }}
    >
      <Stack
        direction={isSmallScreen ? 'column' : 'row'}
        justifyContent="center"
        alignItems="stretch"
        sx={{ width: '100%', maxWidth: '1200px' }}
        spacing={4}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(4),
          }}
        >
          <Box
            component="img"
            src={LoginImage}
            alt="Imagem Minimalista"
            sx={{ maxWidth: '100%', maxHeight: '400px' }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: theme.spacing(4),
          }}
        >
          <Box>
            <Typography variant="h4" align="center" gutterBottom>
              Página não encontrada
            </Typography>
            <Typography variant="body1" align="center">
              A página que você está procurando não existe.
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default NotFoundPage;