// src/pages/ServicePage/index.tsx

import Layout from '../../../components/Layout';
import { Container, Typography, Card, CardContent, Box, styled } from '@mui/material';
import {
  Chat as ChatIcon,
  WhatsApp as WhatsAppIcon,
  Web as WebIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';

const ServiceCard = styled(Card)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ServicesContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const ServiceItem = styled(Box)`
  flex: 1 1 300px; // Permite que os itens cresçam e encolham, com largura mínima de 300px
  max-width: 350px; // Largura máxima para evitar que os itens fiquem muito largos
`;

const ServicePage = () => {
  const services = [
    {
      title: 'Assistente Virtual',
      description: 'Atendimento automatizado com produtos e serviços.',
      icon: <ChatIcon color="primary" sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Chatbot para WhatsApp Business',
      description: 'Comunicação eficiente e automatizada no WhatsApp.',
      icon: <WhatsAppIcon color="primary" sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Implementação de Site Corporativo',
      description: 'Site completo com banco de dados, hospedagem e IA opcional.',
      icon: <WebIcon color="primary" sx={{ fontSize: 40 }} />,
    },
    {
      title: 'Análise de Dados',
      description: 'Insights valiosos para decisões estratégicas.',
      icon: <AnalyticsIcon color="primary" sx={{ fontSize: 40 }} />,
    },
  ];

  return (
    <Layout>
      <Container maxWidth="lg" sx={{ py: 20 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Nossos Serviços
        </Typography>
        <ServicesContainer>
          {services.map((service, index) => (
            <ServiceItem key={index}>
              <ServiceCard>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    {service.icon}
                  </Box>
                  <Typography variant="h6" align="center" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography variant="body2" align="center">
                    {service.description}
                  </Typography>
                </CardContent>
              </ServiceCard>
            </ServiceItem>
          ))}
        </ServicesContainer>
      </Container>
    </Layout>
  );
};

export default ServicePage;