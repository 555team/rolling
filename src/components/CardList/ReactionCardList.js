import { useState, useEffect } from 'react';
import { ReactComponent as NextIcon } from 'assets/icons/arrow_right.svg';
import styled from 'styled-components';
import Card from 'components/CardList/Card';
import useRequest from 'hooks/useRequest';

function ReactionCardList({ title }) {
  const [page, setPage] = useState(0);
  const limit = 4;
  const { data, isLoading, error } = useRequest({
    url: `1-5/recipients/`,
    method: 'get',
    params: { limit: 1000, sort: 'like' },
  });

  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (data && data.results) {
      const sorted = [...data.results].sort(
        (a, b) => b.reactionCount - a.reactionCount
      );
      setSortedData(sorted);
    }
  }, [data]);

  const showPreviousButton = page > 0;
  const showNextButton = page < Math.ceil(sortedData.length / limit) - 1;
  const paginatedData = sortedData.slice(page * limit, (page + 1) * limit);

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
      <CardListContainer>
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

export default ReactionCardList;
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
  ${({ position }) => (position === 'left' ? 'left: -20px;' : 'right: -20px;')}
`;

const PreviousIcon = styled(NextIcon)`
  transform: scaleX(-1);
`;
