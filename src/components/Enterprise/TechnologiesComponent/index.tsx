// src/components/Home/TecnologiasUtilizadas.tsx

import { Box, Typography, Chip, Container, styled, keyframes } from '@mui/material';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const TecnologiasContainer = styled(Box)`
  background: linear-gradient(135deg, #c9edf7 30%, #6beeff 50%);
  padding: 60px 0;
  animation: ${fadeIn} 1s ease-in-out;
  position: relative;
  overflow: hidden;
`;

const ChipsContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

const GradientOverlay = styled(Box)`
  position: absolute;
  left: 0;
  width: 100%;
  height: 80px;
  background: linear-gradient(to bottom, rgba(201, 237, 247, 0), rgba(255, 255, 255, 1)); // Gradiente de azul claro para branco
`;

const TechnologiesComponent = () => {
  const tecnologias = ['Machine Learning', 'Deep Learning', 'NLP', 'Visão Computacional'];

  return (
    <TecnologiasContainer>
      <GradientOverlay sx={{ top: 0, transform: 'translateY(-100%)' }} />
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Tecnologias que Utilizamos
        </Typography>
        <ChipsContainer>
          {tecnologias.map((tecnologia, index) => (
            <Chip key={index} label={tecnologia} />
          ))}
        </ChipsContainer>
      </Container>
      <GradientOverlay sx={{ bottom: 0, transform: 'translateY(100%) rotate(180deg)' }} />
    </TecnologiasContainer>
  );
};

export default TechnologiesComponent;