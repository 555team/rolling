import { useState, useRef } from 'react';
import { ReactComponent as NextIcon } from 'assets/icons/arrow_right.svg';
import styled from 'styled-components';
import Card from 'components/CardList/Card';
import useRequest from 'hooks/useRequest';
import media from 'styles/media';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import Spinner from 'components/Spinner/Spinner';

function CardList({ title }) {
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);
  const swiperRef = useRef(null);

  const { data, isLoading, error } = useRequest({
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

  if (isLoading) return <Spinner />;
  if (error) return <p>데이터 로딩 에러: {error.message}</p>;

  return (
    <ListPageContainer>
      <Title>{title}</Title>
      <CardListContainer>
        {showPrevButton && (
          <NavigationButton onClick={goToPrevSlide} position="left">
            <PreviousIcon />
          </NavigationButton>
        )}

        <Cards
          onSwiper={onSwiperInit}
          onSlideChange={handleSlideChange}
          spaceBetween={20}
          slidesPerView={'auto'}
          breakpoints={{
            1199: {
              slidesPerGroup: 1,
            },
            1200: {
              slidesPerGroup: 4,
            },
          }}
        >
          {validData.map((card) => (
            <SwiperSlide key={card.id}>
              <Card card={card} />
            </SwiperSlide>
          ))}
        </Cards>
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
    margin-left: 24px;
  `}
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

const Cards = styled(Swiper)`
  width: 100%;
  height: 100%;
  display: flex;

  .swiper-wrapper {
    width: calc(100vw - 24px);
    @media (min-width: 1199px) {
      width: 1160px;
    }
  }

  .swiper-slide {
    width: 275px;

    @media (max-width: 767px) {
      width: 208px;
    }
  }
`;
