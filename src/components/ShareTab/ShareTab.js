import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { OutlinedButton } from 'components/button/OutlinedButton';
import KakaoShareButton from './KakaoShareButton';
import LinkShareButton from './LinkShareButton';
import { ReactComponent as ShareIcon } from 'assets/icons/share-icon.svg';

function Dropdown() {
  const resultUrl = window.location.href;
  return (
    <DropMenu>
      <KakaoShareButton resultUrl={resultUrl} />
      <LinkShareButton resultUrl={resultUrl} />
    </DropMenu>
  );
}

function ShareTab() {
  const [isOpen, setIsOpen] = useState(false);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleBlurContainer = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  return (
    <Container className="share-container" onBlur={handleBlurContainer}>
      <OutlinedButton width={56} height={36} onClick={handleDropdown}>
        <div>
          <ShareIcon />
        </div>
      </OutlinedButton>
      {isOpen && <Dropdown />}
    </Container>
  );
}

export default ShareTab;

const Container = styled.div`
  position: realtive;
  display: flex;
  flex-direction: column;
`;

const DropMenu = styled.div`
  position: absolute;
  top: 56px;
  display: inline-flex;
  padding: 10px 1px;
  flex-direction: column;
  align-items: flex-start;
  width: 138px;
  height: 100px;
  border-radius: 8px;
  ${({ theme }) =>
    theme &&
    css`
      border: 1px solid ${theme[`--gray-300`]};
      background-color: ${theme[`white`]};
    `}


  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  }
`;
