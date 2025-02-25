import { ReactNode } from 'react';
import { FloatingWhatsApp } from 'react-floating-whatsapp';
import Logo from '@/assets/img/logo-sf.png';
import { LayoutContainer, MainContent } from './LayoutStyles';

interface LayoutProps {
  children: ReactNode;
  withSidebar?: boolean;
  withWhatsApp?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, withSidebar, withWhatsApp }) => {
  return (
    <LayoutContainer withSidebar={withSidebar}>
      <MainContent withSidebar={withSidebar}>
        {children}
      </MainContent>
      {withWhatsApp && (
        <FloatingWhatsApp
          phoneNumber="+5521998090928"
          accountName="Genius"
          chatMessage="Olá! Como posso te ajudar?"
          allowClickAway={true}
          allowEsc={true}
          darkMode={false}
          placeholder="Digite sua mensagem..."
          avatar={Logo}
          statusMessage={"Online"}
        />
      )}
    </LayoutContainer>
  );
};

export default Layout;
