// src/pages/ContactPage/index.tsx

import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  styled,
} from '@mui/material';
import Layout from '../../../components/Layout';

const ContactForm = styled('form')`
  width: 100%;
  margin-top: 20px;
`;

const FormRow = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 20px;
`;

const FormItem = styled(Box)`
  flex: 1 1 300px;
  min-width: 300px;
`;

const ContactPage = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [servico, setServico] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ nome, email, servico, mensagem });
    // Aqui você pode adicionar a lógica para enviar o formulário
    // Limpar o formulário após o envio
    setNome('');
    setEmail('');
    setServico('');
    setMensagem('');
  };

  return (
    <Layout withWhatsApp={true}>
      <Container maxWidth="md" sx={{ py: 20 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Entre em Contato
        </Typography>
        <ContactForm onSubmit={handleSubmit}>
          <FormRow>
            <FormItem>
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </FormItem>
            <FormItem>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormItem>
          </FormRow>
          <FormRow>
            <FormItem>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="servico-label">Serviço de Interesse</InputLabel>
                <Select
                  labelId="servico-label"
                  id="servico"
                  value={servico}
                  onChange={(e) => setServico(e.target.value)}
                  label="Serviço de Interesse"
                  required
                >
                  <MenuItem value="">
                    <em>Selecione um serviço</em>
                  </MenuItem>
                  <MenuItem value="assistente-virtual">Assistente Virtual</MenuItem>
                  <MenuItem value="chatbot-whatsapp">Chatbot para WhatsApp Business</MenuItem>
                  <MenuItem value="site-corporativo">Implementação de Site Corporativo</MenuItem>
                  <MenuItem value="analise-dados">Análise de Dados</MenuItem>
                </Select>
              </FormControl>
            </FormItem>
          </FormRow>
          <FormRow>
            <FormItem>
              <TextField
                label="Mensagem"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
              />
            </FormItem>
          </FormRow>
          <FormRow>
            <FormItem>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Enviar Mensagem
              </Button>
            </FormItem>
          </FormRow>
        </ContactForm>
      </Container>
    </Layout>
  );
};

export default ContactPage;