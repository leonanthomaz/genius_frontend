// src/pages/SettingsPage/index.tsx

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  SelectChangeEvent,
} from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import Layout from '../../../components/Layout';

const SettingsPage: React.FC = () => {
  // Dados mockados da empresa (vindos do backend)
  const [empresa, setEmpresa] = useState({
    nome: 'Empresa XYZ',
    cnpj: '12.345.678/0001-99',
    email: 'contato@empresa.com',
    telefone: '',
    endereco: '',
    site: '',
    descricao: '',
    endpoint: '',
    api: 'deepseek', // API padrão
    modelo: '', // Modelo selecionado
    chaveApi: '',
  });

  const [arquivoExcel, setArquivoExcel] = useState<File | null>(null);
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [fonteDados, setFonteDados] = useState<'endpoint' | 'upload'>('upload'); // Estado para controlar a fonte de dados

  // Opções de API e modelos
  const apis = [
    { nome: 'DeepSeek', modelos: ['deepseek-1.0', 'deepseek-2.0'] },
    { nome: 'OpenAI', modelos: ['gpt-3.5-turbo', 'gpt-4'] },
    { nome: 'Gemini', modelos: ['gemini-1.0', 'gemini-2.0-flash'] },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setEmpresa((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setArquivoExcel(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validação dos campos obrigatórios
    if (fonteDados === 'endpoint' && !empresa.endpoint) {
      alert('O campo Endpoint é obrigatório!');
      return;
    }

    if (fonteDados === 'upload' && !arquivoExcel) {
      alert('O upload de arquivo Excel é obrigatório!');
      return;
    }

    // Aqui você pode enviar os dados para o backend
    console.log('Dados enviados:', { ...empresa, arquivoExcel });
    alert('Configurações salvas com sucesso!');
  };

  return (
    <Layout withSidebar={true}>
      <Box>

        <Typography variant="h5" sx={{ mt:8, mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
          Configurações da Empresa
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Aqui está um resumo das atividades recentes e informações importantes.
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Campos bloqueados */}
          <TextField
            label="Nome da Empresa"
            value={empresa.nome}
            fullWidth
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            label="CNPJ"
            value={empresa.cnpj}
            fullWidth
            disabled
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            value={empresa.email}
            fullWidth
            disabled
            sx={{ mb: 2 }}
          />

          {/* Campos editáveis */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Telefone"
              name="telefone"
              value={empresa.telefone}
              onChange={handleChange}
              sx={{ flex: 1 }}
            />
            <TextField
              label="Site Corporativo"
              name="site"
              value={empresa.site}
              onChange={handleChange}
              sx={{ flex: 1 }}
            />
          </Box>

          <TextField
            label="Endereço"
            name="endereco"
            value={empresa.endereco}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Descrição da Empresa"
            name="descricao"
            value={empresa.descricao}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ mb: 2 }}
          />

          {/* Configurações da Assistente Virtual */}
          <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
            Fonte de Dados
          </Typography>

          {/* Escolha da fonte de dados */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de Fonte</InputLabel>
            <Select
              value={fonteDados}
              onChange={(e) => setFonteDados(e.target.value as 'endpoint' | 'upload')}
              label="Fonte de Dados"
              required
            >
              <MenuItem value="upload">Upload de Arquivo Excel</MenuItem>
              <MenuItem value="endpoint">Endpoint</MenuItem>
            </Select>
          </FormControl>

          {/* Campo Endpoint (visível apenas se a fonte for endpoint) */}
          {fonteDados === 'endpoint' && (
          <>
            <TextField
              label="Endpoint de Entrada"
              name="endpoint"
              value={empresa.endpoint}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              placeholder="Ex: https://api.empresa.com/dados"
              required
            />
            <TextField
              label="Endpoint de Saída"
              name="endpoint"
              value={empresa.endpoint}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
              placeholder="Ex: https://api.empresa.com/dados"
              disabled
            />
          </>
          )}

          {/* Upload de Arquivo Excel (visível apenas se a fonte for upload) */}
          {fonteDados === 'upload' && (
            <Box sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<CloudUpload />}
                sx={{ mb: 1 }}
              >
                Upload de Arquivo Excel
                <input type="file" hidden accept=".xlsx, .xls" onChange={handleFileChange} required />
              </Button>
              {arquivoExcel && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Arquivo selecionado: {arquivoExcel.name}
                </Typography>
              )}
            </Box>
          )}

          {/* Configurações de API e Modelo */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel>IA</InputLabel>
              <Select
                name="api"
                value={empresa.api}
                onChange={handleChange}
                label="API de IA"
              >
                {apis.map((api) => (
                  <MenuItem key={api.nome} value={api.nome.toLowerCase()}>
                    {api.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ flex: 1 }}>
              <InputLabel>Modelo</InputLabel>
              <Select
                name="modelo"
                value={empresa.modelo}
                onChange={handleChange}
                label="Modelo"
              >
                {apis
                  .find((api) => api.nome.toLowerCase() === empresa.api)
                  ?.modelos.map((modelo) => (
                    <MenuItem key={modelo} value={modelo}>
                      {modelo}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>

          {/* Configurações da Assistente Virtual */}
          <Typography variant="h6" sx={{ mt: 3, mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
            Chave da IA
          </Typography>
          <TextField
            label="API Key"
            name="chaveApi"
            value={empresa.chaveApi}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            placeholder="Insira sua chave de API"
            required
          />

          {/* Termos de uso */}
          <FormControlLabel
            control={
              <Checkbox
                checked={aceitoTermos}
                onChange={(e) => setAceitoTermos(e.target.checked)}
                color="primary"
              />
            }
            label="Aceito os termos de uso"
            sx={{ mb: 2 }}
          />

          {/* Botão de envio */}
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            Salvar Configurações
          </Button>
        </form>
      </Box>
    </Layout>
  );
};

export default SettingsPage;