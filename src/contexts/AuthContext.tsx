import React, { createContext, useReducer, useContext, ReactNode, useEffect } from 'react';
// import { loginApi, getUserDetailsApi, loginWithGoogleApi } from '../services/api';
import { loginApi, getUserDetailsApi } from '../services/api';
import { toast } from 'react-toastify';

// src/contexts/AuthContext.tsx
interface User {
    id: number;
    username: string;
    empresa_id: number;
    empresa_nome: string;
    empresa_descricao: string | null;
    empresa_ramo: string | null; 
    empresa_cnpj: string | null;
    empresa_telefone: string | null;
    empresa_email: string | null;
    empresa_endereco: string | null;
    empresa_website: string | null;
    empresa_endpoint_entrada: string | null;
    empresa_endpoint_saida: string | null;
    empresa_tipo_ia: string | null;
    empresa_modelo_ia: string | null; 
    empresa_token_ia: string | null; 
    empresa_tipo_negocio: string | null;
}


interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    error: string | null;
    token: string | null;
}

interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
    login: (username: string, password: string) => Promise<void>;
    // loginWithGoogle: (token: string) => Promise<void>;
    logout: () => void;
    getToken: () => string | null;
    getUser: () => User | null;
    isAuthenticated: () => boolean;
}

type AuthAction =
    | { type: 'LOGIN_REQUEST' }
    | { type: 'LOGIN_SUCCESS'; payload: { token: string; user: User } }
    | { type: 'LOGIN_FAILURE'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'SET_USER'; payload: User }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_TOKEN'; payload: string | null };

const initialState: AuthState = {
    isAuthenticated: !!localStorage.getItem('USER_TOKEN'),
    user: JSON.parse(localStorage.getItem('CURRENT_USER') || 'null'),
    isLoading: false,
    error: null,
    token: localStorage.getItem('USER_TOKEN') || null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return { ...state, isLoading: true, error: null };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                isLoading: false,
                error: null,
                token: action.payload.token,
            };
        case 'LOGIN_FAILURE':
            return { ...state, isLoading: false, error: action.payload, token: null, user: null, isAuthenticated: false };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, user: null, token: null };
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        default:
            return state;
    }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const initializeAuth = async () => {
            const token = localStorage.getItem('USER_TOKEN');
            if (token && !state.user) {
                try {
                    dispatch({ type: 'SET_LOADING', payload: true });
                    const user = await getUserDetailsApi(token);
                    dispatch({ type: 'SET_USER', payload: user });
                    localStorage.setItem('CURRENT_USER', JSON.stringify(user));
                    dispatch({ type: 'SET_TOKEN', payload: token });
                } catch (error: any) {
                    console.error('Erro ao inicializar autenticação:', error);
                    localStorage.removeItem('USER_TOKEN');
                    localStorage.removeItem('CURRENT_USER');
                    dispatch({ type: 'LOGOUT' });
                } finally {
                    dispatch({ type: 'SET_LOADING', payload: false });
                }
            }
        };
        initializeAuth();
    }, [state.user]);

    const login = async (username: string, password: string) => {
        dispatch({ type: 'LOGIN_REQUEST' });
        try {
            const token = await loginApi(username, password);
            localStorage.setItem('USER_TOKEN', token);
            const user = await getUserDetailsApi(token);
            localStorage.setItem('CURRENT_USER', JSON.stringify(user));
            dispatch({ type: 'LOGIN_SUCCESS', payload: { token, user } });
            toast.success('Login bem-sucedido!');
        } catch (error: any) {
            console.error('Erro ao fazer login:', error);
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Erro ao tentar fazer login. Verifique suas credenciais.' });
            toast.error('Erro ao tentar fazer login. Verifique suas credenciais.');
        }
    };

    // const loginWithGoogle = async (token: string) => {
    //     dispatch({ type: 'LOGIN_REQUEST' });
    //     try {
    //         const apiToken = await loginWithGoogleApi(token);
    //         localStorage.setItem('USER_TOKEN', apiToken);
    //         const user = await getUserDetailsApi(apiToken);
    //         localStorage.setItem('CURRENT_USER', JSON.stringify(user));
    //         dispatch({ type: 'LOGIN_SUCCESS', payload: { token: apiToken, user } });
    //         toast.success('Login com Google bem-sucedido!');
    //     } catch (error: any) {
    //         console.error('Erro ao fazer login com Google:', error);
    //         dispatch({ type: 'LOGIN_FAILURE', payload: 'Erro ao autenticar com Google.' });
    //         toast.error('Erro ao autenticar com Google.');
    //     }
    // };

    const logout = () => {
        localStorage.removeItem('USER_TOKEN');
        localStorage.removeItem('CURRENT_USER');
        dispatch({ type: 'LOGOUT' });
        toast.success('Logout realizado com sucesso!');
    };

    const getToken = () => state.token;
    const getUser = () => state.user;
    const isAuthenticated = () => state.isAuthenticated;

    // const value = { state, dispatch, login, logout, loginWithGoogle, getToken, getUser, isAuthenticated };
    const value = { state, dispatch, login, logout, getToken, getUser, isAuthenticated };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};