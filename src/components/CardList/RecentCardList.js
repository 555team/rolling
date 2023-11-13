import { useState, useEffect } from 'react';
import { ReactComponent as NextIcon } from 'assets/icons/arrow_right.svg';
import styled from 'styled-components';
import Card from 'components/CardList/Card';
import useRequest from 'hooks/useRequest';
import media from 'styles/media';

function RecentCardList({ title }) {
  const [page, setPage] = useState(0);
  const [issetScroll, setScroll] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const { data, isLoading, error } = useRequest({
    url: `1-5/recipients/`,
    method: 'get',
    params: { limit: 1000 },
  });

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

  const validData = data?.results || [];
  const getLimit = () => (issetScroll ? validData.length : 4);

  const showPreviousButton = page > 0;
  const showNextButton = page < Math.ceil(validData.length / getLimit()) - 1;
  const paginatedData = validData.slice(
    page * getLimit(),
    (page + 1) * getLimit()
  );

  function handleNextClick() {
    setPage(page + 1);
  }

  function handlePreviousClick() {
    setPage(page - 1);
  }

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터 로딩 에러: {error.message}</p>;

  return (
    <ListPageContainer>
      <Title>{title}</Title>
      <CardListContainer
        style={issetScroll ? { width: `${windowWidth - 24}px` } : {}}
      >
        {showPreviousButton && (
          <NavigationButton onClick={handlePreviousClick} position="left">
            <PreviousIcon />
          </NavigationButton>
        )}
        {paginatedData.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        {showNextButton && (
          <NavigationButton onClick={handleNextClick} position="right">
            <NextIcon />
          </NavigationButton>
        )}
      </CardListContainer>
    </ListPageContainer>
  );
}

export default RecentCardList;

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
