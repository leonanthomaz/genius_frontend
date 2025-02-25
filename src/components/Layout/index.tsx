// src/components/Layout.tsx

import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../Navbar';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import Logo from '@/assets/img/logo-sf.png';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box>
      <Navbar />
      <Box>{children}</Box>
      <FloatingWhatsApp
        phoneNumber="+5521998090928" // Número de telefone com código do país
        accountName="Sua Empresa" // Nome da empresa
        chatMessage="Olá! Como posso te ajudar?" // Mensagem inicial do chat
        allowClickAway={true} // Permite fechar o chat clicando fora
        allowEsc={true} // Permite fechar o chat com a tecla Esc
        darkMode={false} // Modo escuro (false para desativar)
        placeholder="Digite sua mensagem..." // Placeholder da caixa de mensagem
        avatar={Logo} // URL do avatar (opcional)
        statusMessage={"Online"}
      />
    </Box>
  );
};

export default Layout;