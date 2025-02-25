// src/components/HowItWorksPage.tsx

import { Container, Typography, Box, Grid, Paper, styled, keyframes } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import RocketLaunchOutlinedIcon from '@mui/icons-material/RocketLaunchOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StepPaper = styled(Paper)`
  padding: 30px;
  text-align: center;
  animation: ${fadeInUp} 0.5s ease-in-out;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <LightbulbOutlinedIcon sx={{ fontSize: 40, color: '#1976D2' }} />,
      title: 'Consultoria Inicial',
      description: 'Entendemos suas necessidades e objetivos para criar uma solução personalizada.',
    },
    {
      icon: <SettingsSuggestOutlinedIcon sx={{ fontSize: 40, color: '#1976D2' }} />,
      title: 'Desenvolvimento Personalizado',
      description: 'Criamos soluções de IA sob medida, focadas em suas necessidades específicas.',
    },
    {
      icon: <EmojiObjectsOutlinedIcon sx={{ fontSize: 40, color: '#1976D2' }} />,
      title: 'Implementação e Testes',
      description: 'Integramos a solução ao seu sistema e realizamos testes rigorosos para garantir o funcionamento.',
    },
    {
      icon: <CheckCircleOutlineIcon sx={{ fontSize: 40, color: '#1976D2' }} />,
      title: 'Treinamento e Suporte',
      description: 'Capacitamos sua equipe para utilizar a solução e oferecemos suporte contínuo.',
    },
    {
      icon: <RocketLaunchOutlinedIcon sx={{ fontSize: 40, color: '#1976D2' }} />,
      title: 'Resultados e Otimização',
      description: 'Monitoramos os resultados e ajustamos a solução para maximizar o impacto no seu negócio.',
    },
    {
      icon: <RocketLaunchOutlinedIcon sx={{ fontSize: 40, color: '#1976D2' }} />,
      title: 'Resultados e Otimização',
      description: 'Monitoramos os resultados e ajustamos a solução para maximizar o impacto no seu negócio.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Como Trabalhamos
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Nosso processo é projetado para garantir que você obtenha o máximo valor de nossas soluções de IA.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {steps.map((step, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <StepPaper elevation={3}>
              <Box sx={{ mb: 2 }}>{step.icon}</Box>
              <Typography variant="h6" gutterBottom>
                {step.title}
              </Typography>
              <Typography variant="body2">{step.description}</Typography>
            </StepPaper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HowItWorksPage;