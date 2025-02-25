// src/components/Layout/index.tsx

import { ReactNode } from 'react';
import { LayoutContainer, MainContent } from './LayoutStyles';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutContainer>
      <MainContent>
        {children}
      </MainContent>
    </LayoutContainer>
  );
};

export default Layout;