import styled, { css, keyframes } from 'styled-components';
import theme from 'styles/theme';

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoxWrapper = styled.div`
  display: grid;
  grid-template: 168px / repeat(4, 168px);
  margin-top: 45px;
  gap: 12px;

  ${({ theme }) => theme.mobile`
    grid-template: 1fr 1fr / 1fr 1fr;
  `};
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
  display: inline;
`;

const translate = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(10px);
  }
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

  &.selected {
    ${SelectedIcon} {
      animation: ${translate} 0.2s ease-in-out forwards;
    }
  }

  ${({ theme }) => theme.mobile`
    width: 154px;
    height: 154px;
    
      &:nth-child(even) {
        justify-self: start;
      }
      
      &:nth-child(odd) {
        justify-self: end;
      }
  `};
`;

const SpinnerWrapper = styled.div`
  ${flexCenter};
  margin-top: 45px;
  height: 168px;
`;

export {
  flexCenter,
  BoxWrapper,
  SelectedIcon,
  BoxImage,
  BoxColor,
  Box,
  SpinnerWrapper,
};
