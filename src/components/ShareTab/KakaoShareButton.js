import styled from 'styled-components';
import { useEffect } from 'react';

const { Kakao } = window;

function KakaoShareButton({ resultUrl }) {
  useEffect(() => {
    Kakao.cleanup();
    Kakao.init('c3b33855c1fdfc0e5b37b532362a5bdf');
  }, [resultUrl]);

  const shareK = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: 'Rolling',
        description: '나만의 롤링페이퍼를 만들어보세요.',
        imageUrl:
          'https://cdn.pixabay.com/photo/2017/11/12/00/07/aged-2941136_1280.jpg',
        link: {
          mobileWebUrl: resultUrl,
          webUrl: resultUrl,
        },
      },

      buttons: [
        {
          title: '웹으로 이동',
          link: {
            mobileWebUrl: resultUrl,
            webUrl: resultUrl,
          },
        },
        {
          title: '앱으로 이동',
          link: {
            mobileWebUrl: resultUrl,
            webUrl: resultUrl,
          },
        },
      ],
    });
  };
  return <Button onClick={shareK}>카카오톡 공유</Button>;
}

export default KakaoShareButton;

const Button = styled.button`
  width: 100%;
  height: 100%;
  padding: 12px 16px;
  text-align: left;
  &:hover {
    background-color: ${({ theme }) => theme[`--gray-100`]};
  }
`;
