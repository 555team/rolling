import styled from 'styled-components';

export const TextEditorLayout = styled.div`
  max-width: 720px;
  width: 100%;
  height: 260px;
  border: 1px solid ${({ theme }) => theme[`--gray-300`]};
  border-radius: 8px;

  & * {
    strong {
      font-weight: bold !important;
    }
    em {
      font-style: italic !important;
    }
  }
  & .ql-toolbar {
    border: none;
    border-radius: 8px 8px 0px 0px;
    background-color: ${({ theme }) => theme[`--gray-200`]};
  }
  & .ql-container {
    border: none;
    outline: none;
  }
  & .ql-editor {
    * {
      font-size: 16px;
      font-family: ${(props) => props.font};
    }
  }
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme[`--gray-900`]};
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.24px;
  padding: 0 0 12px 0;
`;

export const Spacing = styled.div`
  padding: 25px;
`;

export const Select = styled.select`
  padding: 12px 16px;
  display: flex;
  width: 320px;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme[`--gray-300`]};
`;
