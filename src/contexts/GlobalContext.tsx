import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import LoadingPage from '../components/Loading/LoadingPage';

interface GlobalContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);


  const setLoading = (loading: boolean) => {
    setIsLoading(loading);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <GlobalContext.Provider
      value={{
        isLoading,
        setLoading,
      }}
    >
      {/* Renderiza a página de loading se estiver carregando */}
      {isLoading ? <LoadingPage /> : children}

    </GlobalContext.Provider>
  );
};

export const useGlobal = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
