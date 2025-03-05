import React, { useState } from 'react';
import { Box, Grid, Paper, TextField, Typography, styled } from '@mui/material';
import ChatWindow from './ChatWindow';
import ParametersPanel from './ParametersPanel';
import { sendMessageToAssistant } from '../../../services/api';
import Layout from '../../../components/Layout';
import Navbar from '../../../components/Enterprise/Navbar';

const ChatContainer = styled(Box)`
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
`;

const ChatPage: React.FC = () => {
  const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [companyConfig, setCompanyConfig] = useState<any>({});

  const handleSendMessage = async (message: string) => {
    if (!companyId) {
      alert('Por favor, insira o ID da empresa.');
      return;
    }

    const newChat = [...chat, { sender: 'Você', text: message }];
    setChat(newChat);
    setLoading(true);
    setTyping(true);

    try {
      const response = await sendMessageToAssistant(message, companyId, companyConfig);
      setChat([...newChat, { sender: 'Assistente', text: response.response }]);
    } catch (error) {
      setChat([...newChat, { sender: 'Assistente', text: 'Erro ao obter resposta. Tente novamente!' }]);
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  const handleCompanyConfigChange = (config: any) => {
    setCompanyConfig(config);
  };

  return (
    <Layout withWhatsApp={true}>
      <Navbar/>
      <ChatContainer maxWidth="lg" sx={{ py: 15 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} style={{ height: '70vh', display: 'flex', flexDirection: 'column' }}>
              <ChatWindow
                chat={chat}
                loading={loading}
                typing={typing}
                onSendMessage={handleSendMessage}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} style={{ padding: '20px' }}>
              <Typography variant="h6" gutterBottom>
                Configurações
              </Typography>
              <TextField
                label="ID da Empresa"
                type="number"
                value={companyId || ''}
                onChange={(e) => setCompanyId(e.target.value ? parseInt(e.target.value, 10) : null)}
                fullWidth
                margin="normal"
              />
              <ParametersPanel onCompanyConfigChange={handleCompanyConfigChange} />
            </Paper>
          </Grid>
        </Grid>
      </ChatContainer>
    </Layout>
  );
};

export default ChatPage;