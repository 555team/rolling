import { useState } from 'react';
import { ReactComponent as NextIcon } from 'assets/icons/arrow_right.svg';
import styled from 'styled-components';
import Card from 'components/CardList/Card';
import useRequest from 'hooks/useRequest';

function CardList({ title }) {
  const [offset, setOffset] = useState(0);

  const { data, isLoading, error } = useRequest({
    url: `1-5/recipients/`,
    method: 'get',
    params: { limit: 4, offset },
    deps: offset,
  });

  function handleNextClick() {
    setOffset((prevOffset) => prevOffset + 4);
  }

  function handlePreviousClick() {
    setOffset((prevOffset) => prevOffset - 4);
  }

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>데이터 로딩 에러: {error.message}</p>;

  // 데이터가 있을 경우 카드 리스트를 렌더링합니다.
  return (
    <ListPageContainer>
      <Title>{title}</Title>
      <CardListContainer>
        {data.previous && (
          <NavigationButton
            onClick={handlePreviousClick}
            position="left"
            isVisible={!!data.previous}
          >
            <PreviousIcon />
          </NavigationButton>
        )}
        {data.results.map((card) => (
          <Card key={card.id} card={card} />
        ))}
        {data.next && (
          <NavigationButton
            onClick={handleNextClick}
            position="right"
            isVisible={!!data.next}
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
