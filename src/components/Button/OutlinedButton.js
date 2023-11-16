import styled from 'styled-components';

function OutlinedButton({
  children,
  width = 24,
  height = 24,
  className = 'normal',
  onClick,
  disabled = false,
}) {
  return (
    <OutlinedButtonLayout
      className={className}
      width={width}
      height={height}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </OutlinedButtonLayout>
  );
}

export { OutlinedButton };

const OutlinedButtonLayout = styled.button`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  &.bold {
    border-radius: 12px;
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.18px;
    padding: 14px 16px;
  }
  &.normal {
    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    padding: 6px;
  }
  &.light {
    font-size: 14px;
    font-weight: 400;
    border-radius: 6px;
    padding: 2px 5px;
  }

  border: 1px solid ${({ theme }) => theme[`--gray-300`]};
  color: ${({ theme }) => theme[`--gray-900`]};
  background-color: ${({ theme }) => theme[`white`]};

  &:hover {
    background-color: ${({ theme }) => theme[`--gray-100`]};
  }
  &:active {
    background-color: ${({ theme }) => theme[`--gray-100`]};
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme[`--gray-500`]};
    background-color: ${({ theme }) => theme[`white`]};
  }
  &:disabled {
    color: ${({ theme }) => theme[`white`]};
    background-color: ${({ theme }) => theme[`--gray-300`]};
  }
`;
