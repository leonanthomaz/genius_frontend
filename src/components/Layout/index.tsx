// src/components/Layout.tsx

import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../Navbar';
import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
      <WhatsAppWidget
        phoneNumber="(21) 99809-0928"
        message="Olá! Como posso te ajudar?"
        companyName="Sua Empresa"
        sendButtonText="Enviar" // Traduzindo o botão de envio
        headerTitle="Fale Conosco" // Traduzindo o título do cabeçalho
        chatPersonName="Atendimento" // Traduzindo o nome da pessoa do chat
        chatPersonOffline="Offline" // Traduzindo o status offline
        chatPersonTyping="Digitando..." // Traduzindo o status digitando
      />
    </Box>
  );
};

export default Layout;