import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { BarChart, PieChart } from '@mui/icons-material';
import { Download } from '@mui/icons-material';
import Layout from '../../../components/Layout';

const AnalyticsPage: React.FC = () => {
  // Estado para o filtro de período
  const [periodo, setPeriodo] = useState<string>('7d');

  // Dados mockados para métricas
  const metricas = {
    interacoes: 120,
    vendas: 15,
    satisfacao: 4.5, // Nota de 1 a 5
    mensagensEnviadas: 200,
    mensagensRecebidas: 180,
    taxaResposta: '90%',
  };

  // Dados mockados para gráficos
  // const dadosInteracoes = [50, 60, 70, 80, 90, 100, 120]; // Últimos 7 dias
  // const dadosVendas = [5, 7, 6, 8, 10, 12, 15]; // Últimos 7 dias
  // const dadosSentimento = [70, 20, 10]; // Positivo, Neutro, Negativo (em porcentagem)

  // Função para simular o download de um relatório
  const handleDownloadRelatorio = () => {
    alert('Relatório baixado com sucesso!');
  };

  return (
    <Layout withSidebar={true}>
      <Box>
        
        {/* Título e Filtros */}
        <Typography variant="h5" sx={{ mt:8, mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
          Estatísticas e Análises
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Aqui está um resumo das atividades recentes e informações importantes.
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Período</InputLabel>
            <Select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value as string)}
              label="Período"
            >
              <MenuItem value="7d">Últimos 7 dias</MenuItem>
              <MenuItem value="30d">Últimos 30 dias</MenuItem>
              <MenuItem value="90d">Últimos 90 dias</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<Download />}
            onClick={handleDownloadRelatorio}
          >
            Baixar Relatório
          </Button>
        </Box>

        {/* Cards de Métricas */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Interações
                </Typography>
                <Typography variant="h4">{metricas.interacoes}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Vendas
                </Typography>
                <Typography variant="h4">{metricas.vendas}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Satisfação do Cliente
                </Typography>
                <Typography variant="h4">{metricas.satisfacao}/5</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Gráficos */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Interações da Assistente
                </Typography>
                <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PieChart fontSize="large" />
                  <Typography variant="body1">Gráfico de Interações</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Vendas Realizadas
                </Typography>
                <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <BarChart fontSize="large" />
                  <Typography variant="body1">Gráfico de Vendas</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Análise de Sentimento */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Sentimento das Conversas
            </Typography>
            <Box sx={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PieChart fontSize="large" />
              <Typography variant="body1">Gráfico de Sentimento</Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Métricas do WhatsApp Business */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Métricas do WhatsApp Business
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1">Mensagens Enviadas</Typography>
                <Typography variant="h5">{metricas.mensagensEnviadas}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1">Mensagens Recebidas</Typography>
                <Typography variant="h5">{metricas.mensagensRecebidas}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="body1">Taxa de Resposta</Typography>
                <Typography variant="h5">{metricas.taxaResposta}</Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Layout>

  );
};

export default AnalyticsPage;