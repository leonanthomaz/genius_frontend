import React, { useState, useEffect } from 'react';
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
import { useAuth } from '../../../contexts/AuthContext';

const SettingsPage: React.FC = () => {
  const { getUser } = useAuth();
  const user = getUser(); // Obtenha o usuário

  // Dados da empresa (vindos do backend)
  const [empresa, setEmpresa] = useState({
    nome: user?.empresa_nome || '',
    cnpj: user?.empresa_cnpj || '',
    email: user?.empresa_email || '',
    telefone: user?.empresa_telefone || '',
    endereco: user?.empresa_endereco || '',
    site: user?.empresa_website || '',
    descricao: user?.empresa_descricao || '',
    ramo: user?.empresa_ramo || '',
    endpoint_entrada: user?.empresa_endpoint_entrada || '',
    endpoint_saida: user?.empresa_endpoint_saida || '',
    tipo_ia: user?.empresa_tipo_ia || '',
    modelo_ia: user?.empresa_modelo_ia || '',
    chaveApi: user?.empresa_token_ia || '',
    tipoNegocio: user?.empresa_tipo_negocio || '',
  });

  

  const [arquivoExcel, setArquivoExcel] = useState<File | null>(null);
  const [aceitoTermos, setAceitoTermos] = useState(false);
  const [fonteDados, setFonteDados] = useState<'endpoint' | 'upload'>('upload'); // Estado para controlar a fonte de dados

  // Opções de API e modelos
  const apis = [
    { nome: 'OpenAI', modelos: ['gpt-3.5-turbo', 'gpt-4'] },
    { nome: 'Gemini', modelos: ['gemini-1.5-flash'] },
  ];

  // Efeito para atualizar as opções de IA conforme o tipo de negócio
  useEffect(() => {
    if (empresa.tipoNegocio === 'servico') {
      setEmpresa((prev) => ({
        ...prev,
        tipo_ia: 'gemini',
        modelo_ia: 'gemini-1.5-flash',
        chaveApi: '', // Limpa a chave da OpenAI
      }));
    } else {
      setEmpresa((prev) => ({
        ...prev,
        tipo_ia: 'openai',
        modelo_ia: 'gpt-3.5-turbo',
      }));
    }
  }, [empresa.tipoNegocio]);

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
    if (fonteDados === 'endpoint' && !empresa.endpoint_entrada) {
      alert('O campo Endpoint de Entrada é obrigatório!');
      return;
    }

    if (fonteDados === 'upload' && !arquivoExcel) {
      alert('O upload de arquivo Excel é obrigatório!');
      return;
    }

    if (!aceitoTermos) {
      alert('Você deve aceitar os termos de uso!');
      return;
    }

    // Aqui você pode enviar os dados para o backend
    console.log('Dados enviados:', { ...empresa, arquivoExcel });
    alert('Configurações salvas com sucesso!');
  };

  return (
    <Layout withSidebar={true}>
      <Box>
        <Typography variant="h5" sx={{ mt: 8, mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
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
          <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
            Fonte de Dados
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
              Escolha a fonte de dados para seus serviços ou produtos.
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
                name="endpoint_entrada"
                value={empresa.endpoint_entrada}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
                placeholder="Ex: https://api.empresa.com/dados"
                required
              />
              <TextField
                label="Aguardando..."
                name="endpoint_saida"
                value={empresa.endpoint_saida}
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

          {/* Tipo de Negócio */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Tipo de Negócio</InputLabel>
            <Select
              name="tipoNegocio"
              value={empresa.tipoNegocio}
              onChange={handleChange}
              label="Tipo de Negócio"
              required
            >
              <MenuItem value="produto">Produtos</MenuItem>
              <MenuItem value="servico">Serviços</MenuItem>
              <MenuItem value="produto-servico">Produtos e Serviços</MenuItem>
            </Select>
          </FormControl>

          {/* Configurações de API e Modelo */}
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <FormControl sx={{ flex: 1 }}>
              <InputLabel>Tipo de IA</InputLabel>
              <Select
                name="tipo_ia"
                value={empresa.tipo_ia}
                onChange={handleChange}
                label="API de IA"
                disabled
              >
                {apis.map((api) => (
                  <MenuItem key={api.nome} value={api.nome.toLowerCase()}>
                    {api.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ flex: 1 }}>
              <InputLabel>Modelo de IA</InputLabel>
              <Select
                name="modelo_ia"
                value={empresa.modelo_ia}
                onChange={handleChange}
                label="Modelo de IA"
                disabled
              >
                {apis
                  .find((api) => api.nome.toLowerCase() === empresa.tipo_ia)
                  ?.modelos.map((modelo) => (
                    <MenuItem key={modelo} value={modelo}>
                      {modelo}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>

          {/* Chave de API */}
          <Typography variant="h6" sx={{ mt: 3, mb: 1, color: 'primary.main', fontWeight: 'bold' }}>
            Chave da IA
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
              Insira sua chave da inteligência artificial escolhida.
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