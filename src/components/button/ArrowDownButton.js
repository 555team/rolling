import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow_down.svg';

function ArrowDownButton({ onClick }) {
  return (
    <ArrowIconLayout onClick={onClick}>
      <ArrowIcon />
    </ArrowIconLayout>
  );
}
export default ArrowDownButton;

const ArrowIconLayout = styled.button`
  border: 1px solid black;
  padding: 0.6rem;
`;
