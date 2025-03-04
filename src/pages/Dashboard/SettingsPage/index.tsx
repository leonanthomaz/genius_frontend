import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../contexts/AuthContext';
import SettingsForm from './SettingsForm'; // Importe o novo componente

const SettingsPage: React.FC = () => {
    const { getUser } = useAuth();
    const user = getUser();

    const [company, setCompany] = useState({
        name: user?.company.name || '',
        cnpj: user?.company.cnpj || '',
        email: user?.company.email || '',
        phone: user?.company.phone || '',
        address: user?.company.address || '',
        website: user?.company.website || '',
        description: user?.company.description || '',
        industry: user?.company.industry || '',
        input_endpoint: user?.company.input_endpoint || '',
        output_endpoint: user?.company.output_endpoint || '',
        ai_type: user?.company.ai_type || '',
        ai_model: user?.company.ai_model || '',
        ai_token: user?.company.ai_token || '',
        business_type: user?.company.business_type || '',
    });

    const [excelFile, setExcelFile] = useState<File | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [dataSource, setDataSource] = useState<'endpoint' | 'upload'>('upload');

    const apis = [
        { name: 'OpenAI', models: ['gpt-3.5-turbo', 'gpt-4'] },
        { name: 'Gemini', models: ['gemini-1.5-flash'] },
    ];

    useEffect(() => {
        if (company.business_type === 'servico') {
            setCompany((prev) => ({
                ...prev,
                ai_type: 'gemini',
                ai_model: 'gemini-1.5-flash',
                ai_token: '',
            }));
        } else {
            setCompany((prev) => ({
                ...prev,
                ai_type: 'openai',
                ai_model: 'gpt-3.5-turbo',
            }));
        }
    }, [company.business_type]);

    const handleCompanyChange = (newCompany: any) => {
        setCompany(newCompany);
    };

    const handleExcelFileChange = (newExcelFile: File | null) => {
        setExcelFile(newExcelFile);
    };

    const handleTermsAcceptedChange = (newTermsAccepted: boolean) => {
        setTermsAccepted(newTermsAccepted);
    };

    const handleDataSourceChange = (newDataSource: 'endpoint' | 'upload') => {
        setDataSource(newDataSource);
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

                <SettingsForm
                    company={company}
                    excelFile={excelFile}
                    termsAccepted={termsAccepted}
                    dataSource={dataSource}
                    apis={apis}
                    onCompanyChange={handleCompanyChange}
                    onExcelFileChange={handleExcelFileChange}
                    onTermsAcceptedChange={handleTermsAcceptedChange}
                    onDataSourceChange={handleDataSourceChange}
                />
            </Box>
        </Layout>
    );
};

export default SettingsPage;