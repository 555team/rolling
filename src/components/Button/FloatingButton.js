import styled from 'styled-components';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ReactComponent as Letter } from 'assets/icons/letter-opened-svgrepo-com.svg';
import { ReactComponent as List } from 'assets/icons/list-heart-svgrepo-com.svg';
import { ReactComponent as Setting } from 'assets/icons/setting-5-svgrepo-com.svg';

function EditMenu({ className }) {
  const { id } = useParams();
  const isEditPage = location.pathname !== `/post/${id}/edit`;

  return (
    <MenuContainer className={className}>
      <MenuButtonContainer>
        <MenuLable>리스트 페이지로 돌아가기</MenuLable>
        <MenuButton>
          <Link to={`/list`}>
            <List />
          </Link>
        </MenuButton>
      </MenuButtonContainer>

      <MenuButtonContainer>
        <MenuLable>메세지 남기기</MenuLable>
        <MenuButton>
          <Link to={`/post/${id}/message`}>
            <Letter />
          </Link>
        </MenuButton>
      </MenuButtonContainer>
      {isEditPage && (
        <MenuButtonContainer>
          <MenuLable>수정 페이지로 이동하기</MenuLable>
          <MenuButton>
            <Link to={`/post/${id}/edit`}>
              <Setting />
            </Link>
          </MenuButton>
        </MenuButtonContainer>
      )}
      {!isEditPage && <Spacing></Spacing>}
    </MenuContainer>
  );
}

function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const handleButton = () => {
    setIsOpen(!isOpen);
  };
  const handleCloseMenu = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };
  return (
    <Container>
      <FloatingButtonLayout onClick={handleButton} onBlur={handleCloseMenu}>
        +
      </FloatingButtonLayout>
      <div>
        <EditMenu className={isOpen ? 'visible' : 'hidden'} />
      </div>
    </Container>
  );
}

export { FloatingButton };

const Container = styled.div`
  position: fixed;
  bottom: 30px;
  right: 30px;
`;

const Spacing = styled.div`
  width: 20px;
`;
const MenuContainer = styled.div`
  position: absolute;
  right: 2px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  &.hidden {
    visibility: hidden;
    transition: 0.5s all;
    transform: translatey(135%);
    z-index: -1;
  }
  &.visible {
    transition: 0.5s all;
    transform: translatey(-135%);
    z-index: -1;
  }
`;
const MenuButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: space-around;
  align-items: center;
  &:hover {
    & button {
      transition: 0.1s;
      transform: scale(1.2);
    }
    & p {
      visibility: visible;
    }
  }
`;
const MenuLable = styled.p`
  background-color: white;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  border-radius: 6px;
  height: 40px;
  padding: 7px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  visibility: hidden;
`;
const MenuButton = styled.button`
  padding: 10px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: ${({ theme }) => theme[`--purple-400`]};
`;

const FloatingButtonLayout = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  font-size: 30px;
  color: white;
  font-weight: 700;
  z-index: 55;

  background-color: ${({ theme }) => theme[`--purple-600`]};
  &:hover {
    background-color: ${({ theme }) => theme[`--purple-700`]};
  }
  &:active {
    background-color: ${({ theme }) => theme[`--purple-800`]};
  }
  &:focus {
    outline: 2px solid ${({ theme }) => theme[`--purple-900`]};
    background-color: ${({ theme }) => theme[`--purple-800`]};
  }
`;
