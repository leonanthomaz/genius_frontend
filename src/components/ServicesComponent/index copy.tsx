// src/components/ServicesComponent.tsx

import { Grid, Card, CardContent, Typography, Container, Box, CardMedia } from '@mui/material';
import styled, { keyframes } from 'styled-components';
import virtualAssistantImage from '@/assets/img/virtual-assistant.png';
import dataAnalysisImage from '@/assets/img/data-analysis.png';
import automationImage from '@/assets/img/automation.png';

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

const CardStyled = styled(Card)`
  animation: ${fadeInUp} 0.5s ease-in-out;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px; // Adiciona padding para melhor espaçamento
`;

const ServicesComponent = () => {
  const servicos = [
    {
      titulo: 'Assistente Virtual',
      descricao: 'Atendimento automatizado com IA.',
      imagem: virtualAssistantImage,
    },
    {
      titulo: 'Análise de Dados',
      descricao: 'Insights para decisões estratégicas.',
      imagem: dataAnalysisImage,
    },
    {
      titulo: 'Automação de Processos',
      descricao: 'Otimize suas operações com IA.',
      imagem: automationImage,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Nossos Serviços
      </Typography>
      <Grid container spacing={4}>
        {servicos.map((servico, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardStyled>
              <CardImage>
                <img src={servico.imagem} alt={servico.titulo} style={{ maxWidth: '100%', maxHeight: '150px', objectFit: 'contain' }} />
              </CardImage>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {servico.titulo}
                </Typography>
                <Typography variant="body2">{servico.descricao}</Typography>
              </CardContent>
            </CardStyled>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ServicesComponent;