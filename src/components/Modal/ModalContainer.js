import styled from 'styled-components';

function ModalContainer({ onClick, children }) {
  return <Container onClick={onClick}>{children}</Container>;
}

export default ModalContainer;

const Container = styled.div`
  z-index: 50;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;
