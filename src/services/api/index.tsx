import axios, { AxiosResponse } from 'axios';

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

export const loginWithGoogleApi = async (token: string): Promise<string> => {
    try {
        //Implemente a lógica de login com google aqui.
        return "token_mockado";
    } catch (error) {
        throw error;
    }
};