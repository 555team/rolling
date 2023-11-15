import Modal from './ModalPortal';
import styled from 'styled-components';
function CardModal({ onClose }) {
  return (
    <Modal onClick={onClose}>
      <Content>
        모달 내용이 들어갈 곳!!!
        <br />
        <br />
        <button onClick={onClose}>확인</button>
      </Content>
    </Modal>
  );
}

export default CardModal;

const Content = styled.div`
  width: 600px;
  min-width: 30px;
  height: 476px;
  position: absolute;
  background-color: white;
  border-radius: 16px;
`;
