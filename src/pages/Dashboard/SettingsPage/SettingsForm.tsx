import React from 'react';
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

interface SettingsFormProps {
  company: {
    name: string;
    cnpj: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    description: string;
    industry: string;
    input_endpoint: string;
    output_endpoint: string;
    ai_type: string;
    ai_model: string;
    ai_token: string;
    business_type: string;
  };
  excelFile: File | null;
  termsAccepted: boolean;
  dataSource: 'endpoint' | 'upload';
  apis: Array<{ name: string; models: string[] }>;
  onCompanyChange: (newCompany: any) => void;
  onExcelFileChange: (newExcelFile: File | null) => void;
  onTermsAcceptedChange: (newTermsAccepted: boolean) => void;
  onDataSourceChange: (newDataSource: 'endpoint' | 'upload') => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({
  company,
  excelFile,
  termsAccepted,
  dataSource,
  apis,
  onCompanyChange,
  onExcelFileChange,
  onTermsAcceptedChange,
  onDataSourceChange,
}) => {
  // Função para campos de texto
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    onCompanyChange({ ...company, [name]: value });
  };

  // Função específica para o Select
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    onCompanyChange({ ...company, [name as string]: value });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onExcelFileChange(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (dataSource === 'endpoint' && !company.input_endpoint) {
      alert('O campo Endpoint de Entrada é obrigatório!');
      return;
    }
    if (dataSource === 'upload' && !excelFile) {
      alert('O upload de arquivo Excel é obrigatório!');
      return;
    }
    if (!termsAccepted) {
      alert('Você deve aceitar os termos de uso!');
      return;
    }
    console.log('Dados enviados:', { ...company, excelFile });
    alert('Configurações salvas com sucesso!');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Campos bloqueados */}
      <TextField
        label="Nome da Empresa"
        value={company.name}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        label="CNPJ"
        value={company.cnpj}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />
      <TextField
        label="Email"
        value={company.email}
        fullWidth
        disabled
        sx={{ mb: 2 }}
      />

      {/* Campos editáveis */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          label="Telefone"
          name="phone"
          value={company.phone}
          onChange={handleChange}
          sx={{ flex: 1 }}
        />
        <TextField
          label="Site Corporativo"
          name="website"
          value={company.website}
          onChange={handleChange}
          sx={{ flex: 1 }}
        />
      </Box>

      <TextField
        label="Endereço"
        name="address"
        value={company.address}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
      />

      <TextField
        label="Descrição da Empresa"
        name="description"
        value={company.description}
        onChange={handleChange}
        fullWidth
        multiline
        rows={4}
        sx={{ mb: 2 }}
      />

      {/* Fonte de Dados */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tipo de Fonte</InputLabel>
        <Select
          value={dataSource}
          onChange={(e) => onDataSourceChange(e.target.value as 'endpoint' | 'upload')}
          label="Fonte de Dados"
        >
          <MenuItem value="upload">Upload de Arquivo Excel</MenuItem>
          <MenuItem value="endpoint">Endpoint</MenuItem>
        </Select>
      </FormControl>

      {/* Endpoint */}
      {dataSource === 'endpoint' && (
        <>
          <TextField
            label="Endpoint de Entrada"
            name="input_endpoint"
            value={company.input_endpoint}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            required
          />
          <TextField
            label="Aguardando..."
            name="output_endpoint"
            value={company.output_endpoint}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
            disabled
          />
        </>
      )}

      {/* Upload de Arquivo Excel */}
      {dataSource === 'upload' && (
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
          {excelFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Arquivo selecionado: {excelFile.name}
            </Typography>
          )}
        </Box>
      )}

      {/* Tipo de Negócio */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Tipo de Negócio</InputLabel>
        <Select
          name="business_type"
          value={company.business_type}
          onChange={handleSelectChange} // Usar handleSelectChange aqui
          label="Tipo de Negócio"
        >
          <MenuItem value="produto">Produtos</MenuItem>
          <MenuItem value="servico">Serviços</MenuItem>
          <MenuItem value="produto-servico">Produtos e Serviços</MenuItem>
        </Select>
      </FormControl>

      {/* IA */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl sx={{ flex: 1 }}>
          <InputLabel>Tipo de IA</InputLabel>
          <Select
            name="ai_type"
            value={company.ai_type}
            onChange={handleSelectChange} // Usar handleSelectChange aqui
            label="API de IA"
            disabled
          >
            {apis.map((api) => (
              <MenuItem key={api.name} value={api.name.toLowerCase()}>
                {api.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ flex: 1 }}>
          <InputLabel>Modelo de IA</InputLabel>
          <Select
            name="ai_model"
            value={company.ai_model}
            onChange={handleSelectChange} // Usar handleSelectChange aqui
            label="Modelo de IA"
            disabled
          >
            {apis
              .find((api) => api.name.toLowerCase() === company.ai_type)
              ?.models.map((model) => (
                <MenuItem key={model} value={model}>
                  {model}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>

      {/* Chave de API */}
      <TextField
        label="API Key"
        name="ai_token"
        value={company.ai_token}
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
            checked={termsAccepted}
            onChange={(e) => onTermsAcceptedChange(e.target.checked)}
            color="primary"
          />
        }
        label="Aceito os termos de uso"
        sx={{ mb: 2 }}
      />

      {/* Botão de envio */}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }} onClick={(e) => handleSubmit(e)}>
        Salvar Configurações
      </Button>
    </form>
  );
};

export default SettingsForm;