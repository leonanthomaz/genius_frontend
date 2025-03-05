import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../contexts/AuthContext';
import Cookies from 'js-cookie';
import { ServiceType } from '../../../types/EnterpriseType';
import { servicePostApi } from '../../../services/api';

const initialServiceData: Omit<ServiceType, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'deleted_by'> = {
  name: '',
  description: '',
  price: 0,
  category: '',
  image: '',
  company_id: 0,
  code: '',
};

const ServiceAdminPage: React.FC = () => {
  const [serviceData, setServiceData] = useState(initialServiceData);
  const { state } = useAuth();

  useEffect(() => {
    if (state.user?.company.id) {
      setServiceData(prev => ({ ...prev, company_id: state.user?.company.id ?? 0 }));
    }
  }, [state.user]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setServiceData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (event: any) => {
    const { name, value } = event.target;
    setServiceData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const token = Cookies.get('geniusToken');

    if (!token || !state.user) {
      alert('Usuário não autenticado.');
      return;
    }

    try {
      await servicePostApi(token, serviceData, state.user);
      alert('Serviço cadastrado com sucesso!');
      setServiceData(initialServiceData);
    } catch (error) {
      console.error('Erro ao cadastrar serviço:', error);
      alert('Erro ao cadastrar serviço. Tente novamente.');
    }
  };

  return (
    <Layout withSidebar>
      <Box>
        <Typography variant="h5" sx={{ mt: 8, mb: 3, color: 'primary.main', fontWeight: 'bold' }}>
          Cadastro de Serviço
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Preencha os campos abaixo para cadastrar um novo serviço.
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <TextField
              label="Nome"
              name="name"
              value={serviceData.name}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              label="Descrição"
              name="description"
              value={serviceData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                label="Preço"
                name="price"
                type="number"
                value={serviceData.price}
                onChange={handleChange}
                sx={{ flex: 1 }}
              />
              <TextField
                label="Código"
                name="code"
                value={serviceData.code}
                onChange={handleChange}
                sx={{ flex: 1 }}
              />
            </Box>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Categoria</InputLabel>
              <Select
                name="category"
                value={serviceData.category}
                onChange={handleSelectChange}
              >
                <MenuItem value="consultoria">Consultoria</MenuItem>
                <MenuItem value="desenvolvimento">Desenvolvimento</MenuItem>
                <MenuItem value="suporte">Suporte</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="URL da Imagem"
              name="image"
              value={serviceData.image}
              onChange={handleChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
              Cadastrar Serviço
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Layout>
  );
};

export default ServiceAdminPage;