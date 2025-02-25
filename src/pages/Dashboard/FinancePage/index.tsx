import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Download, Payment } from '@mui/icons-material';
import Layout from '../../../components/Layout';

const FinancePage: React.FC = () => {
  // Dados mockados para o resumo financeiro
  const [resumoFinanceiro] = useState({
    receita: 15000,
    custos: 5000,
    saldo: 10000,
  });

  // Dados mockados para mensalidades
  const [mensalidades] = useState([
    { id: 1, descricao: 'Mensalidade Outubro 2023', valor: 1000, status: 'Paga' },
    { id: 2, descricao: 'Mensalidade Novembro 2023', valor: 1000, status: 'Pendente' },
    { id: 3, descricao: 'Mensalidade Dezembro 2023', valor: 1000, status: 'Pendente' },
  ]);

  // Dados mockados para notas fiscais
  const [notasFiscais] = useState([
    { id: 1, numero: '001', data: '2023-10-01', valor: 1000, link: '#' },
    { id: 2, numero: '002', data: '2023-09-01', valor: 1000, link: '#' },
    { id: 3, numero: '003', data: '2023-08-01', valor: 1000, link: '#' },
  ]);

  // Dados mockados para transações
  const [transacoes] = useState([
    { id: 1, data: '2023-10-01', descricao: 'Pagamento Mensalidade', valor: 1000, tipo: 'Receita' },
    { id: 2, data: '2023-09-15', descricao: 'Compra de Serviços', valor: 500, tipo: 'Custo' },
    { id: 3, data: '2023-09-01', descricao: 'Pagamento Mensalidade', valor: 1000, tipo: 'Receita' },
  ]);

  // Função para simular o download de um relatório
  const handleDownloadRelatorio = () => {
    alert('Relatório baixado com sucesso!');
  };

  // Função para simular o pagamento de uma mensalidade
  const handlePagarMensalidade = (id: number) => {
    alert(`Mensalidade ${id} paga com sucesso!`);
  };

  return (
    <Layout withSidebar={true}>
      <Box>

        <Typography variant="h5" sx={{ mt:8, mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
          Financeiro
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Aqui está um resumo das atividades recentes e informações importantes.
        </Typography>

        {/* Resumo Financeiro */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Resumo Financeiro
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Card sx={{ flex: 1, backgroundColor: '#d0ffd6' }}>
                <CardContent>
                  <Typography variant="body1">Receita</Typography>
                  <Typography variant="h5">R$ {resumoFinanceiro.receita.toLocaleString()}</Typography>
                </CardContent>
              </Card>
              <Card sx={{ flex: 1, backgroundColor: '#ffbfc8' }}>
                <CardContent>
                  <Typography variant="body1">Custos</Typography>
                  <Typography variant="h5">R$ {resumoFinanceiro.custos.toLocaleString()}</Typography>
                </CardContent>
              </Card>
              <Card sx={{ flex: 1, backgroundColor: '#c1e6ff' }}>
                <CardContent>
                  <Typography variant="body1">Saldo</Typography>
                  <Typography variant="h5">R$ {resumoFinanceiro.saldo.toLocaleString()}</Typography>
                </CardContent>
              </Card>
            </Box>
          </CardContent>
        </Card>

        {/* Mensalidades */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Mensalidades
            </Typography>
            <List>
              {mensalidades.map((mensalidade) => (
                <ListItem key={mensalidade.id} sx={{ borderBottom: '1px solid #ddd' }}>
                  <ListItemText
                    primary={mensalidade.descricao}
                    secondary={`Valor: R$ ${mensalidade.valor.toLocaleString()} | Status: ${mensalidade.status}`}
                  />
                  {mensalidade.status === 'Pendente' && (
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<Payment />}
                      onClick={() => handlePagarMensalidade(mensalidade.id)}
                    >
                      Pagar
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Notas Fiscais */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Notas Fiscais
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Número</TableCell>
                    <TableCell>Data</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Ações</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notasFiscais.map((nota) => (
                    <TableRow key={nota.id}>
                      <TableCell>{nota.numero}</TableCell>
                      <TableCell>{nota.data}</TableCell>
                      <TableCell>R$ {nota.valor.toLocaleString()}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          startIcon={<Download />}
                          onClick={() => window.open(nota.link, '_blank')}
                        >
                          Baixar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Histórico de Transações */}
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Histórico de Transações
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Descrição</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Tipo</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transacoes.map((transacao) => (
                    <TableRow key={transacao.id}>
                      <TableCell>{transacao.data}</TableCell>
                      <TableCell>{transacao.descricao}</TableCell>
                      <TableCell>R$ {transacao.valor.toLocaleString()}</TableCell>
                      <TableCell>{transacao.tipo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Botão para baixar relatório */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Download />}
            onClick={handleDownloadRelatorio}
          >
            Baixar Relatório Financeiro
          </Button>
        </Box>
      </Box>
    </Layout>

  );
};

export default FinancePage;