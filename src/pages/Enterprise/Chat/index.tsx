import React, { useState } from 'react';
import { Box, Grid, Paper } from '@mui/material';
import styled from 'styled-components';
import { sendMessageToAssistant } from '../../../services/api';
import ChatWindow from './ChatWindow';
// import ParametersPanel from './ParametersPanel';

const ChatContainer = styled(Box)`
  width: 90%;
  max-width: 1200px;
  margin: 20px auto;
`;

const ChatPage: React.FC = () => {
  const [chat, setChat] = useState<{ sender: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  // const [parameters, setParameters] = useState<{ [key: string]: any }>({
  //   temperature: 0.7,
  //   maxTokens: 150,
  //   useContext: true,
  // });

  const handleSendMessage = async (message: string) => {
    const newChat = [...chat, { sender: 'Você', text: message }];
    setChat(newChat);
    setLoading(true);
    setTyping(true);

    try {
      const response = await sendMessageToAssistant(message);
      setChat([...newChat, { sender: 'Assistente', text: response.response }]);
    } catch (error) {
      setChat([...newChat, { sender: 'Assistente', text: 'Erro ao obter resposta. Tente novamente!' }]);
    } finally {
      setLoading(false);
      setTyping(false);
    }
  };

  // const handleParameterChange = (params: { [key: string]: any }) => {
  //   setParameters(params);
  // };

  return (
    <ChatContainer>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ height: '80vh', display: 'flex', flexDirection: 'column' }}>
            <ChatWindow
              chat={chat}
              setChat={setChat}
              loading={loading}
              typing={typing}
              onSendMessage={handleSendMessage}
            />
          </Paper>
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <ParametersPanel onParameterChange={handleParameterChange} />
        </Grid> */}
      </Grid>
    </ChatContainer>
  );
};

export default ChatPage;