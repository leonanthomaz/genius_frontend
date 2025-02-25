// src/components/Layout/LayoutStyles.tsx

import styled from 'styled-components';

interface LayoutContainerProps {
  sidebarWidth?: number;
}

export const LayoutContainer = styled.div<LayoutContainerProps>`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 0;
  min-height: 100vh;
  padding-top: 50px;
`;

export const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
  border-radius: 8px;
`;