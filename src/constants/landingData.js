import landingImg1 from 'assets/img/landing_img_01.png';
import landingImg2 from 'assets/img/landing_img_02.png';
import webpLandingImg1 from 'assets/img/landing_img_01.webp';
import webpLandingImg2 from 'assets/img/landing_img_02.webp';

const LANDING_DATA = [
  {
    key: 1,
    header: 'Point. 01',
    title: '누구나 손쉽게, 온라인\n 롤링 페이퍼를 만들 수 있어요',
    description: '로그인 없이 자유롭게 만들어요.',
    imgSource: landingImg1,
    webpImgSource: webpLandingImg1,
    imgAlt: '롤링페이퍼를 추가하는 이미지',
  },
  {
    key: 2,
    header: 'Point. 02',
    title: '서로에게 이모지로 감정을\n 표현해보세요',
    description: '롤링 페이퍼에 이모지를 추가할 수 있어요.',
    imgSource: landingImg2,
    webpImgSource: webpLandingImg2,
    imgAlt: '이모지로 감정 표현을 하는 이미지',
  },
];

export default LANDING_DATA;
