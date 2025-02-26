// src/components/HeroSection.tsx

import { Box, Typography, Button, Container, Stack } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import robotImage from '@/assets/img/robot-idea.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const HeroContainer = styled(Box)`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #e0f2f7 30%, #6beeff 50%);
  animation: ${fadeIn} 2s ease-in-out;
  position: relative;
`;

const WaveDivider = styled(Box)`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 250px;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23ffffff' fill-opacity='1' d='M0,288L48,288C96,288,192,288,288,266.7C384,245,480,203,576,170.7C672,139,768,117,864,122.7C960,128,1056,160,1152,170.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <Container maxWidth="lg" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" spacing={{ xs: 2, md: 4 }} sx={{ width: '100%' }}>
          <Box sx={{ textAlign: { xs: 'center', md: 'left' }, padding: '20px', width: { xs: '100%', md: '50%' } }}>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                fontSize: { xs: '2.5rem', md: '3rem' },
                fontFamily: "'Bebas Neue', sans-serif", // Fonte do título
                fontWeight: 600,
                letterSpacing: '1px',
              }}
            >
              Inteligência Artificial para o seu Negócio
            </Typography>
            <Typography variant="body1" paragraph sx={{ fontSize: { xs: '1rem', md: '1.1rem' } }}>
              Transforme seus processos com soluções de IA personalizadas.
            </Typography>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2, px: 4, py: 1.5, fontSize: { xs: '1rem', md: '1.1rem' } }}
              >
                Entre em Contato
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', width: { xs: '100%', md: '50%' } }}>
            <img src={robotImage} alt="Robô de IA" style={{ maxWidth: '70%', height: 'auto' }} />
          </Box>
        </Stack>
      </Container>
      <WaveDivider />
    </HeroContainer>
  );
};

export default HeroSection;