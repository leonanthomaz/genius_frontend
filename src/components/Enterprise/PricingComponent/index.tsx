// src/pages/PricingPage.tsx

import { Container, Typography, Box, Card, CardContent, styled, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import DiamondIcon from '@mui/icons-material/Diamond';
import StarIcon from '@mui/icons-material/Star';

const CardStyled = styled(Card)`
  height: 100%;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const PlansContainer = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const PlanItem = styled(Box)`
  flex: 1 1 300px;
  max-width: 350px;
`;

const PricingComponent = () => {
  const plans = [
    {
      title: 'Plano Básico',
      price: 'R$ 59/mês',
      features: [
        'Acesso à assistente virtual',
        'Análise de dados básica',
        'Suporte por e-mail',
        'Atualizações mensais',
        '1 Usuário',
        '1 Xereca com cerveja'
      ],
      icon: <StarIcon sx={{ color: '#1976D2' }} />,
    },
    {
      title: 'Plano Premium',
      price: 'R$ 99/mês',
      features: [
        'Acesso prioritário à assistente',
        'Análise de dados avançada',
        'Suporte prioritário (WhatsApp)',
        'Atualizações semanais',
        'Automação de processos',
        '1 Cuzinho com cerveja'
      ],
      icon: <DiamondIcon sx={{ color: '#FFD700' }} />,
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Nossos Planos
      </Typography>
      <Typography variant="body1" align="center" paragraph>
        Escolha o plano que melhor se adapta às suas necessidades.
      </Typography>
      <PlansContainer>
        {plans.map((plan, index) => (
          <PlanItem key={index}>
            <CardStyled>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                  {plan.icon}
                </Box>
                <Typography variant="h5" align="center" gutterBottom>
                  {plan.title}
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                  {plan.price}
                </Typography>
                <List>
                  {plan.features.map((feature, featureIndex) => (
                    <ListItem key={featureIndex} disablePadding>
                      <ListItemIcon>
                        <CheckCircleOutlineIcon sx={{ color: '#1976D2' }} />
                      </ListItemIcon>
                      <ListItemText primary={feature} />
                    </ListItem>
                  ))}
                </List>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<WhatsAppIcon />}
                    href="https://wa.me/SEU_NUMERO_WHATSAPP" // Substitua pelo seu número
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Fale Conosco
                  </Button>
                </Box>
              </CardContent>
            </CardStyled>
          </PlanItem>
        ))}
      </PlansContainer>
    </Container>
  );
};

export default PricingComponent;