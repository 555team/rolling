import styled from 'styled-components';
import { ReactComponent as CircleIcon } from 'assets/icons/circle-button-icon.svg';

function MainPrimaryButton({ title, onClick, className, disabled = false }) {
  return (
    <MainPrimaryButtonLayout
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </MainPrimaryButtonLayout>
  );
}

function SubPrimaryButton({ title, onClick, disabled = false }) {
  return (
    <SubPrimaryButtonLayout onClick={onClick} disabled={disabled}>
      {title}
    </SubPrimaryButtonLayout>
  );
}

function SecondaryButton({ title, onClick, className, disabled = false }) {
  return (
    <SecondaryButtonLayout
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </SecondaryButtonLayout>
  );
}

function CircleButton({ onClick, disabled = false }) {
  return (
    <CircleButtonLayout onClick={onClick} disabled={disabled}>
      <CircleIcon />
    </CircleButtonLayout>
  );
}

export { MainPrimaryButton, SubPrimaryButton, SecondaryButton, CircleButton };

const MainPrimaryButtonLayout = styled.button`
  width: 100%;
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 800;
  line-height: 28px;
  letter-spacing: -0.18px;

  @media (min-width: 1200px) {
    width: 280px;
  }

  color: ${({ theme }) => theme[`white`]};
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
  &:disabled {
    background-color: ${({ theme }) => theme[`--gray-300`]};
  }
`;

const SubPrimaryButtonLayout = styled(MainPrimaryButtonLayout)`
  width: 122px;
  padding: 7px 16px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: -0.16px;
`;

const SecondaryButtonLayout = styled.button`
  width: 122px;
  padding: 7px 16px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: -0.16px;

  border: 1px solid ${({ theme }) => theme[`--purple-600`]};
  color: ${({ theme }) => theme[`--purple-700`]};
  background-color: ${({ theme }) => theme[`white`]};
  &:hover {
    border: 1px solid ${({ theme }) => theme[`--purple-700`]};
    background-color: ${({ theme }) => theme[`--purple-100`]};
  }
  &:active {
    border: 1px solid ${({ theme }) => theme[`--purple-800`]};
    background-color: ${({ theme }) => theme[`--purple-100`]};
  }
  &:disabled {
    border: none;
    color: ${({ theme }) => theme[`white`]};
    background-color: ${({ theme }) => theme[`--gray-300`]};
  }
`;

const CircleButtonLayout = styled.button`
  width: 56px;
  height: 56px;
  padding: 16px;
  border-radius: 100px;

  color: ${({ theme }) => theme[`white`]};
  background-color: ${({ theme }) => theme[`--gray-500`]};
  &:hover {
    background-color: ${({ theme }) => theme[`--gray-600`]};
  }
  &:active {
    background-color: ${({ theme }) => theme[`--gray-700`]};
  }
  &:focus {
    outline: 1px solid ${({ theme }) => theme[`--gray-800`]};
    background-color: ${({ theme }) => theme[`--gray-700`]};
  }
  &:disabled {
    background-color: ${({ theme }) => theme[`--gray-300`]};
  }
`;
