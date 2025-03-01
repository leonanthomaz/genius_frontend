import React, { useState, ChangeEvent } from 'react';
import { Paper, Typography, TextField, FormControlLabel, Switch, Box } from '@mui/material';
import styled from 'styled-components';

interface ParametersPanelProps {
  onParameterChange: (params: { [key: string]: any }) => void;
}

const StyledPaper = styled(Paper)`
  padding: 20px;
  width: 300px;
`;

const ParametersPanel: React.FC<ParametersPanelProps> = ({ onParameterChange }) => {
  const [temperature, setTemperature] = useState<number>(0.7);
  const [maxTokens, setMaxTokens] = useState<number>(150);
  const [useContext, setUseContext] = useState<boolean>(true);

  const handleTemperatureChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTemperature(parseFloat(event.target.value));
    onParameterChange({ temperature: parseFloat(event.target.value), maxTokens, useContext });
  };

  const handleMaxTokensChange = (event: ChangeEvent<HTMLInputElement>) => {
    setMaxTokens(parseInt(event.target.value, 10));
    onParameterChange({ temperature, maxTokens: parseInt(event.target.value, 10), useContext });
  };

  const handleUseContextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUseContext(event.target.checked);
    onParameterChange({ temperature, maxTokens, useContext: event.target.checked });
  };

  return (
    <StyledPaper elevation={3}>
      <Typography variant="h6" gutterBottom>
        Parâmetros
      </Typography>

      <TextField
        label="Temperatura"
        type="number"
        value={temperature}
        onChange={handleTemperatureChange}
        fullWidth
        margin="normal"
        inputProps={{ min: 0, max: 1, step: 0.1 }}
      />

      <TextField
        label="Máximo de Tokens"
        type="number"
        value={maxTokens}
        onChange={handleMaxTokensChange}
        fullWidth
        margin="normal"
        inputProps={{ min: 1 }}
      />

      <FormControlLabel
        control={<Switch checked={useContext} onChange={handleUseContextChange} />}
        label="Usar Contexto"
      />
    </StyledPaper>
  );
};

export default ParametersPanel;