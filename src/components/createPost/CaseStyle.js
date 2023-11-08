import styled, { css } from 'styled-components';
import theme from 'styles/theme';

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxWrapper = styled.div`
  display: grid;
  grid-template: 1fr / repeat(4, 1fr);
  margin-top: 45px;
  gap: 12px;

  // Mobile
  @media (max-width: 767px) {
    grid-template: 1fr 1fr / 1fr 1fr;
  }
`;

const SelectedIcon = styled.div`
  background-color: ${theme['--gray-500']};
  width: 44px;
  height: 44px;
  padding: 10px;
  border-radius: 100px;
  position: absolute;
`;

const BoxImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const BoxColor = styled.div`
  background-color: ${({ color }) => color};
  width: 100%;
  height: 100%;
`;

const Box = styled.div`
  ${flexCenter};
  background-color: ${theme.white};
  width: 168px;
  height: 168px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  &.selected ${BoxImage}, ${BoxColor}:hover, ${BoxImage}:hover {
    filter: opacity(50%);
  }

  // Mobile
  @media (max-width: 767px) {
    width: 154px;
    height: 154px;
  }
`;

export { flexCenter, BoxWrapper, SelectedIcon, BoxImage, BoxColor, Box };
