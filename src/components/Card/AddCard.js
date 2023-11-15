import styled from 'styled-components';
import { ReactComponent as AddCardButton } from '../../assets/icons/card-add-button-icon.svg';

function AddCard() {
  return (
    <CardWrapper>
      <ButtonWrapper>
        <AddCardButton />
      </ButtonWrapper>
    </CardWrapper>
  );
}

export default AddCard;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  width: 384px;
  height: 280px;
  padding: 28px 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.white};
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
`;

const ButtonWrapper = styled.div`
  padding: 16px;
  background: ${({ theme }) => theme['--gray-500']};
  border-radius: 100px;
`;
