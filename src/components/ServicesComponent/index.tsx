// src/components/ServicesComponent.tsx

import { Container, Typography, Box, Paper, styled, keyframes } from '@mui/material';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';

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

const ServicePaper = styled(Paper)`
  padding: 30px;
  text-align: center;
  animation: ${fadeInUp} 0.5s ease-in-out;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ServicesContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const ServiceItem = styled(Box)`
  flex: 1 1 300px;
  max-width: 350px;
`;

const ServicesComponent = () => {
  const services = [
    {
      icon: <AssessmentOutlinedIcon sx={{ fontSize: 40, color: '#1976D2' }} />,
      title: 'Análise de Dados',
      description: 'Insights para decisões estratégicas.',
    },
    {
      icon: <ChatBubbleOutlineOutlinedIcon sx={{ fontSize: 40, color: '#1976D2' }} />,
      title: 'Chatbots',
      description: 'Atendimento automatizado e eficiente.',
    },
    {
      icon: <SettingsSuggestOutlinedIcon sx={{ fontSize: 40, color: '#1976D2' }} />,
      title: 'Automação de Processos',
      description: 'Otimize suas operações com IA.',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Nossos Serviços
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Oferecemos soluções de IA personalizadas para impulsionar o seu negócio.
      </Typography>
      <ServicesContainer>
        {services.map((service, index) => (
          <ServiceItem key={index}>
            <ServicePaper elevation={3}>
              <Box sx={{ mb: 2 }}>{service.icon}</Box>
              <Typography variant="h6" gutterBottom>
                {service.title}
              </Typography>
              <Typography variant="body2">{service.description}</Typography>
            </ServicePaper>
          </ServiceItem>
        ))}
      </ServicesContainer>
    </Container>
  );
};

export default ServicesComponent;