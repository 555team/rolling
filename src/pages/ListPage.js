import CardList from 'components/CardList/CardList';
import styled from 'styled-components';
import { MainPrimaryButton } from 'components/Button/Button';
import { Link } from 'react-router-dom';
import media from 'styles/media';

function ListPage() {
  return (
    <ListPageContainer>
      <CardList title="인기 롤링 페이퍼 🔥" />
      <CardList title="최근에 만든 롤링 페이퍼 ⭐️️" />
      <Button>
        <Link to="/post">
          <MainPrimaryButton
            title="나도 만들어보기"
            className="list-page-button"
          />
        </Link>
      </Button>
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

const Button = styled.div`
  ${media.tablet`
  width: calc(100% - 48px);
  `}
`;
