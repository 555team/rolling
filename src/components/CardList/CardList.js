import { useState, useEffect } from 'react';
import { ReactComponent as NextIcon } from 'assets/icons/arrow_right.svg';
import styled from 'styled-components';
import Card from 'components/CardList/Card';

function CardList({ title }) {
  const [cards, setCards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  function fetchCards(newOffset) {
    setIsLoading(true);
    fetch(
      `https://rolling-api.vercel.app/1-5/recipients/?limit=4&offset=${newOffset}`
    )
      .then(function (response) {
        if (!response.ok) {
          throw new Error('error');
        }
        return response.json();
      })
      .then(function (data) {
        setCards(data.results);
        setIsLoading(false);
        setNext(data.next);
        setPrevious(data.previous);
      })
      .catch(function (error) {
        setError(error);
        setIsLoading(false);
      });
  }

  useEffect(
    function () {
      fetchCards(offset);
    },
    [offset]
  );

  function handleNextClick() {
    setOffset(function (prevOffset) {
      return prevOffset + 4;
    });
  }

  function handlePreviousClick() {
    setOffset(function (prevOffset) {
      return prevOffset - 4;
    });
  }

  // if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터 로딩 에러: {error.message}</p>;
  if (!cards) return <p>데이터가 없습니다.</p>;

  return (
    <ListPageContainer>
      <Title>{title}</Title>
      <CardListContainer>
        {previous && (
          <NavigationButton
            onClick={handlePreviousClick}
            disabled={isLoading}
            position="left"
            isVisible={previous}
          >
            <PreviousIcon />
          </NavigationButton>
        )}
        {cards.map(function (card) {
          return <Card key={card.id} card={card} />;
        })}
        {next && (
          <NavigationButton
            onClick={handleNextClick}
            disabled={isLoading}
            position="right"
            isVisible={next}
          >
            <NextIcon />
          </NavigationButton>
        )}
      </CardListContainer>
    </ListPageContainer>
  );
}

export default CardList;
const ListPageContainer = styled.div`
  width: 1160px;
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
`;

const CardListContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 50px;
  position: relative;
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
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  ${({ position }) => (position === 'left' ? 'left: -20px;' : 'right: -20px;')}
`;

const PreviousIcon = styled(NextIcon)`
  transform: scaleX(-1);
`;
