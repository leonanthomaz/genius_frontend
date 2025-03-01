import React, { useState, useEffect, useRef } from 'react';
import { TextField, IconButton, CircularProgress, Box, Skeleton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import styled, { keyframes } from 'styled-components';

interface ChatWindowProps {
  chat: { sender: string; text: string }[];
  setChat: React.Dispatch<React.SetStateAction<{ sender: string; text: string }[]>>;
  loading: boolean;
  typing: boolean;
  onSendMessage: (message: string) => void;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ChatWindowContainer = styled(Box)`
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  scroll-behavior: smooth;
`;

const InputArea = styled(Box)`
  display: flex;
  align-items: center;
  border-top: 1px solid #ddd;
  padding-top: 10px;
`;

const TypingAnimation = keyframes`
  0% { transform: translateY(0); opacity: 0.6; }
  50% { transform: translateY(-5px); opacity: 1; }
  100% { transform: translateY(0); opacity: 0.6; }
`;

const TypingIndicator = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 15px;

  span {
    width: 8px;
    height: 8px;
    background-color: #666;
    border-radius: 50%;
    margin: 0 3px;
    animation: ${TypingAnimation} 1.2s infinite ease-in-out;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

const ChatWindow: React.FC<ChatWindowProps> = ({ chat, setChat, loading, typing, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage('');
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <ChatWindowContainer ref={chatRef}>
        {chat.length === 0 ? (
          <Skeleton variant="rectangular" width="80%" height={40} style={{ marginBottom: 10 }} />
        ) : (
          chat.map((msg, index) => <Message key={index} sender={msg.sender} text={msg.text} />)
        )}
        {typing && (
          <TypingIndicator>
            <span></span>
            <span></span>
            <span></span>
          </TypingIndicator>
        )}
      </ChatWindowContainer>

      <InputArea>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={loading ? 'Aguarde a resposta...' : 'Digite sua mensagem...'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={loading}
        />
        <IconButton onClick={handleSendMessage} color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : <SendIcon />}
        </IconButton>
      </InputArea>
    </Box>
  );
};

export default ChatWindow;