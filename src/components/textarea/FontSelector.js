import styled from 'styled-components';

function FontSelector({ onClick }) {
  return (
    <div>
      <Title>폰트 선택</Title>
      <form>
        <Select onChange={onClick}>
          <option value="Noto Sans">Noto Sans</option>
          <option value="Pretendard">Pretendard</option>
          <option value="나눔명조">나눔명조</option>
          <option value="나눔손글씨 손편지체">나눔손글씨 손편지체</option>
        </Select>
      </form>
    </div>
  );
}

export default FontSelector;

const Title = styled.h1`
  color: ${({ theme }) => theme[`--gray-900`]};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.24px;
  padding: 0 0 12px 0;
`;

const Select = styled.select`
  padding: 12px 16px;
  display: flex;
  width: 320px;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme[`--gray-300`]};
`;
