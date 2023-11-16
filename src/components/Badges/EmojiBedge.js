import React from 'react';
import { styled } from 'styled-components';

function EmojiBedge({ children }) {
  return <EmojiBedgeLayout>{children}</EmojiBedgeLayout>;
}

export default EmojiBedge;

const EmojiBedgeLayout = styled.div`
  display: flex;
  height: 30px;
  padding: 8px 12px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 32px;
  background: rgba(0, 0, 0, 0.54);
  color: #fff;
  font-size: 15px;
`;
