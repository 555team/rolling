import React from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from 'assets/icons/arrow_down.svg';

function ArrowDownButton({ onClick }) {
  return (
    <ArrowIconLayout onClick={onClick}>
      <div className="ArrowIconWrap">
        <ArrowIcon />
      </div>
    </ArrowIconLayout>
  );
}
export default ArrowDownButton;

const ArrowIconLayout = styled.button`
  padding: 6px;
  .ArrowIconWrap {
    width: 24px;
    height: 24px;
  }
`;
