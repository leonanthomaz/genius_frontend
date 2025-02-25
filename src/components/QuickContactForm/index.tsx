// src/components/QuickContactForm.tsx

import React, { useState } from 'react';
import { Box, TextField, Button, Typography, styled } from '@mui/material';

const FormContainer = styled(Box)<{ component?: React.ElementType }>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
`;


const QuickContactForm = () => {
  const [email, setEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
    // Aqui você pode adicionar a lógica para enviar o formulário rápido
    alert('Formulário rápido enviado!');
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>
      <Typography variant="h6" align="center" gutterBottom>
        Contato Rápido
      </Typography>
      <TextField
        label="Seu E-mail"
        name="email"
        type="email"
        value={email}
        onChange={handleChange}
        required
      />
      <Button variant="contained" color="primary" type="submit">
        Enviar
      </Button>
    </FormContainer>
  );
};

export default QuickContactForm;