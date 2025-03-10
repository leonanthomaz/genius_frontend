import axios, { AxiosResponse } from 'axios';
import { CompanyInfo, MeResponse, ServiceType } from '../../types/EnterpriseType';

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

export const sendMessageToAssistant = async (
    message: string,
    companyId: number,
    companyConfig: any
  ) => {
    try {
      const response = await api.post('/chat', {
        message,
        company_id: companyId,
        company_config: companyConfig,
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar mensagem para o assistente:', error);
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

export const getCompanyApi = async (token: string, companyId: number): Promise<CompanyInfo> => {
    try {
        const response: AxiosResponse<CompanyInfo> = await api.get(`/company/${companyId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateCompanyApi = async (token: string, companyId: number, companyData: any): Promise<CompanyInfo> => {
    try {
        const response: AxiosResponse<CompanyInfo> = await api.put(`/company/${companyId}`, companyData, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const servicePostApi = async (
    token: string,
    service: Omit<ServiceType, 'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'deleted_by'>, // Removendo campos que não devem ser enviados
    user: MeResponse
  ): Promise<ServiceType> => {
    try {
      const response: AxiosResponse<ServiceType> = await api.post('/services/', service, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };
