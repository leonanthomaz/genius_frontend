// CONTEXTO - PAINEL ADMINISTRATIVO GERAL

import React, { createContext, useReducer, useContext, ReactNode, useEffect, useState } from 'react';
import { loginApi, getUserDetailsApi, loginWithGoogleApi } from '../services/api';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'; // Importe a biblioteca js-cookie
import { useGlobal } from '../contexts/GlobalContext'; // Importe o GlobalContext
import { MeResponse } from '../types/EnterpriseType';


interface AuthState {
    isAuthenticated: boolean;
    user: MeResponse | null;
    isLoading: boolean;
    error: string | null;
}

interface AuthContextType {
    state: AuthState;
    dispatch: React.Dispatch<AuthAction>;
    login: (username: string, password: string) => Promise<void>;
    loginWithGoogle: (token: string) => Promise<void>;
    logout: () => void;
    getToken: () => string | null;
    getUser: () => MeResponse | null;
    isAuthenticated: () => boolean;
    isAdmin: () => boolean;
}

type AuthAction =
    | { type: 'LOGIN_REQUEST' }
    | { type: 'LOGIN_SUCCESS'; payload: { user: MeResponse } }
    | { type: 'LOGIN_FAILURE'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'SET_USER'; payload: MeResponse }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null };

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    isLoading: false,
    error: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
            };
        case 'LOGIN_FAILURE':
            return { ...state, isLoading: false, error: action.payload, user: null, isAuthenticated: false };
        case 'LOGOUT':
            return { ...state, isAuthenticated: false, user: null };
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const [token, setToken] = useState<string | null>(Cookies.get('geniusToken') || null); // Obtém o token do cookie
    const { setLoading } = useGlobal();  // Acesse a função setLoading do GlobalContext
    
    useEffect(() => {
        const initializeAuth = async () => {
            const tokenFromCookie = Cookies.get('geniusToken');
            setToken(tokenFromCookie || null); // Atualiza o estado do token
            if (tokenFromCookie && !state.user) {
                try {
                    setLoading(true); // Ativa o carregamento global
                    dispatch({ type: 'SET_LOADING', payload: true });
                    const user = await getUserDetailsApi(tokenFromCookie);
                    dispatch({ type: 'LOGIN_SUCCESS', payload: { user } });
                } catch (error: any) {
                    console.error('Erro ao inicializar autenticação:', error);
                    setToken(null);
                    Cookies.remove('geniusToken');
                    dispatch({ type: 'LOGOUT' });
                } finally {
                    setLoading(false); // Desativa o carregamento global
                    dispatch({ type: 'SET_LOADING', payload: false });
                }
            } else {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };
    
        initializeAuth();
    }, [state.user, setLoading]);
    
    
    
    const login = async (username: string, password: string) => {
        dispatch({ type: 'LOGIN_REQUEST' });
        try {
            const apiToken = await loginApi(username, password);
            setToken(apiToken);
            Cookies.set('geniusToken', apiToken, { secure: true, sameSite: 'strict' });
            const user = await getUserDetailsApi(apiToken);
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user } });
            toast.success('Login bem-sucedido!');
        } catch (error: any) {
            console.error('Erro ao fazer login:', error);
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Erro ao tentar fazer login. Verifique suas credenciais.' });
            toast.error('Erro ao tentar fazer login. Verifique suas credenciais.');
        }
    };

    const loginWithGoogle = async (googleToken: string) => {
        dispatch({ type: 'LOGIN_REQUEST' });
        try {
            const response = await loginWithGoogleApi(googleToken);
            const apiToken = response.token;
            setToken(apiToken);
            Cookies.set('geniusToken', apiToken, { secure: true, sameSite: 'strict' }); // Armazena o token no cookie
            const user = await getUserDetailsApi(apiToken);
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user } });
            toast.success('Login com Google bem-sucedido!');
        } catch (error: any) {
            console.error('Erro ao fazer login com Google:', error);
            dispatch({ type: 'LOGIN_FAILURE', payload: 'Erro ao autenticar com Google.' });
            toast.error('Erro ao autenticar com Google.');
        }
    };

    const logout = () => {
        setToken(null);
        Cookies.remove('geniusToken'); // Remove o cookie
        dispatch({ type: 'LOGOUT' });
        toast.success('Logout realizado com sucesso!');
    };

    const getToken = () => token;
    const getUser = () => state.user;
    const isAuthenticated = () => state.isAuthenticated;
    const isAdmin = () => state.user?.user.is_admin || false;

    const value = { state, dispatch, login, logout, loginWithGoogle, getToken, getUser, isAuthenticated, isAdmin };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};