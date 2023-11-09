import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import openToast from 'utils/openToast';
function LinkShareButton() {
  const location = useLocation();

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      openToast({ type: 'success', txt: ' URL이 복사 되었습니다.' });
    } catch (err) {
      openToast({ type: 'error', txt: ' URL 복사를 실패하였습니다.' });
      return;
    }
  };

  return (
    <>
      <Button onClick={() => handleCopyClipBoard(`${location.pathname}`)}>
        URL 공유
      </Button>
    </>
  );
}

export default LinkShareButton;

const Button = styled.button`
  width: 100%;
  height: 100%;
  padding: 12px 16px;
  text-align: left;
  &:hover {
    background-color: ${({ theme }) => theme[`--gray-100`]};
  }
`;