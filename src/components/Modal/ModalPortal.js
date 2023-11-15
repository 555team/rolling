import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Backdrop = ({ children, onClick }) => {
  return <Back onClick={onClick}>{children}</Back>;
};

const Modal = ({ children, onClick }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={onClick}>{children}</Backdrop>,
        document.getElementById('modal-root')
      )}
    </>
  );
};

export default Modal;

const Back = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
