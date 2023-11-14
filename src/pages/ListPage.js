import RecentCardList from 'components/CardList/RecentCardList';
import ReactionCardList from 'components/CardList/ReactionCardList';
import styled from 'styled-components';
import { MainPrimaryButton } from 'components/button/Button';

function ListPage() {
  return (
    <ListPageContainer>
      <ReactionCardList title="인기 롤링 페이퍼 🔥" />
      <RecentCardList title="최근에 만든 롤링 페이퍼 ⭐️️" />
      <MainPrimaryButton title="나도 만들어보기" className="list-page-button" />
    </ListPageContainer>
  );
}

export default ListPage;

const ListPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto 218px;
`;
