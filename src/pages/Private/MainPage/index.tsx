// src/pages/MainPage/index.tsx

import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Settings,
  WhatsApp,
  AttachMoney,
  BarChart,
} from '@mui/icons-material';

const MainPage: React.FC = () => {
  // Dados mockados para o resumo
  const resumo = {
    statusAssistente: 'Online',
    interacoesHoje: 42,
    vendasHoje: 5,
    mensalidadesPendentes: 1,
  };

  // Dados mockados para atividades recentes
  const atividadesRecentes = [
    { id: 1, tipo: 'Interação', descricao: 'Cliente perguntou sobre entrega', data: '2023-10-01 10:00' },
    { id: 2, tipo: 'Venda', descricao: 'Produto X vendido para Cliente Y', data: '2023-10-01 09:30' },
    { id: 3, tipo: 'Mensagem', descricao: 'Nova mensagem no WhatsApp', data: '2023-10-01 09:00' },
  ];

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      {/* Boas-Vindas */}
      <Typography variant="h4" sx={{ mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
        Bem-vindo, [Nome do Usuário]!
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Aqui está um resumo das atividades recentes e informações importantes.
      </Typography>

      {/* Cards de Resumo */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Status da Assistente
              </Typography>
              <Typography variant="h5" sx={{ color: resumo.statusAssistente === 'Online' ? 'green' : 'red' }}>
                {resumo.statusAssistente}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Interações Hoje
              </Typography>
              <Typography variant="h5">{resumo.interacoesHoje}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Vendas Hoje
              </Typography>
              <Typography variant="h5">{resumo.vendasHoje}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography variant="body1" sx={{ mb: 1 }}>
                Mensalidades Pendentes
              </Typography>
              <Typography variant="h5">{resumo.mensalidadesPendentes}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Links Rápidos */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Acesso Rápido
      </Typography>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<Settings />}
            sx={{ py: 2 }}
          >
            Configurações
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<WhatsApp />}
            sx={{ py: 2 }}
          >
            WhatsApp Business
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<AttachMoney />}
            sx={{ py: 2 }}
          >
            Financeiro
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<BarChart />}
            sx={{ py: 2 }}
          >
            Estatísticas
          </Button>
        </Grid>
      </Grid>

      {/* Atividades Recentes */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Atividades Recentes
          </Typography>
          <List>
            {atividadesRecentes.map((atividade) => (
              <React.Fragment key={atividade.id}>
                <ListItem>
                  <ListItemText
                    primary={atividade.descricao}
                    secondary={`${atividade.tipo} - ${atividade.data}`}
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>

      {/* Gráficos Simples (Placeholder) */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Interações nos Últimos 7 Dias
          </Typography>
          <Box sx={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="body1">Gráfico de Interações</Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MainPage;
