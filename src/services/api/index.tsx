import axios, { AxiosResponse } from 'axios';
import { CompanyInfo, MeResponse } from '../../types/EnterpriseType';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const loginApi = async (username: string, password: string): Promise<string> => {
    try {
        const response: AxiosResponse<{ token: string }> = await api.post('/login', { username, password });
        return response.data.token;
    } catch (error) {
        throw error;
    }
};

export const getUserDetailsApi = async (token: string): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await api.get('/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendMessageToAssistant = async (message: string) => {
    try {
      const response = await api.post(`/chat`, {
        message,
        id_empresa: 1,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao enviar mensagem para o assistente:", error);
      throw error;
    }
};

export const loginWithGoogleApi = async (token: string): Promise<MeResponse> => {
    try {
        const response: AxiosResponse<MeResponse> = await api.get('/me', {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const updateUserApi = async (token: string, userId: number, userData: any): Promise<any> => {
    try {
        const response: AxiosResponse<any> = await api.patch(`/admin/usuarios/${userId}`, userData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};


export const getEmpresaApi = async (token: string, empresaId: number): Promise<CompanyInfo> => {
    try {
        const response: AxiosResponse<CompanyInfo> = await api.get(`/company/${empresaId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateEmpresaApi = async (token: string, empresaId: number, empresaData: any): Promise<CompanyInfo> => {
    try {
        const response: AxiosResponse<CompanyInfo> = await api.put(`/company/${empresaId}`, empresaData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};