import styled from 'styled-components';

interface LayoutContainerProps {
  withSidebar?: boolean;
}

export const LayoutContainer = styled.div<LayoutContainerProps>`
  display: flex;
  flex-direction: ${({ withSidebar }) => (withSidebar ? 'row' : 'column')};
  min-height: 100vh;
`;

export const MainContent = styled.div<LayoutContainerProps>`
  flex-grow: 1;
  padding: ${({ withSidebar }) => (withSidebar ? '20px' : '3px')};
  border-radius: 8px;
  margin-top: ${({ withSidebar }) => (withSidebar ? '30px' : '0')}; 
`;
