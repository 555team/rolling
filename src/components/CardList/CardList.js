import { useState, useEffect, useRef } from 'react';
import { ReactComponent as NextIcon } from 'assets/icons/arrow_right.svg';
import styled from 'styled-components';
import Card from 'components/CardList/Card';
import useRequest from 'hooks/useRequest';
import media from 'styles/media';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

function CardList({ title }) {
  const [issetScroll, setScroll] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const swiperRef = useRef(null);

  const { data, error } = useRequest({
    url: `1-5/recipients/`,
    method: 'get',
    params:
      title === '인기 롤링 페이퍼 🔥'
        ? { limit: 1000, sort: 'like' }
        : { limit: 1000 },
  });

  const onSwiperInit = (swiper) => {
    swiperRef.current = swiper;
  };

  const handleSlideChange = (swiper) => {
    setShowPrevButton(!swiper.isBeginning);
    setShowNextButton(!swiper.isEnd);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);

      if (window.innerWidth <= 1199) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goToNextSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const goToPrevSlide = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const validData = data?.results || [];

  if (error) return <p>데이터 로딩 에러: {error.message}</p>;

  return (
    <ListPageContainer>
      <Title>{title}</Title>
      <CardListContainer
        style={issetScroll ? { width: `${windowWidth - 24}px` } : {}}
      >
        {showPrevButton && (
          <NavigationButton onClick={goToPrevSlide} position="left">
            <PreviousIcon />
          </NavigationButton>
        )}

        <Swiper
          onSwiper={onSwiperInit} // 스와이퍼 초기화 시에 호출되는 콜백 지정
          onSlideChange={handleSlideChange}
          spaceBetween={20}
          slidesPerView={4}
          slidesPerGroup={4}
        >
          {validData.map((card) => (
            <SwiperSlide key={card.id}>
              <Card card={card} />
            </SwiperSlide>
          ))}
        </Swiper>
        {showNextButton && (
          <NavigationButton onClick={goToNextSlide} position="right">
            <NextIcon />
          </NavigationButton>
        )}
      </CardListContainer>
    </ListPageContainer>
  );
}

export default CardList;

const ListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #000;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.24px;
  margin-bottom: 16px;

  ${media.tablet`
    margin-left: 24px;
  `}
`;

const CardListContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  position: relative;

  ${media.tablet`
    overflow-x: auto;
    margin-left: 24px;
  `}

  @media (min-width: 1199px) {
    width: 1160px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const NavigationButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid #dadcdf;
  position: absolute;
  z-index: 2;
  background: #fff;
  top: 110px;
  ${({ position }) => (position === 'left' ? 'left: -20px;' : 'right: -20px;')}

  ${media.tablet`
    display: none;
  `}

  ${media.mobile`
    display: none;
  `}
`;

const PreviousIcon = styled(NextIcon)`
  transform: scaleX(-1);
`;
