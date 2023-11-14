import Card from 'components/Card/Card';
import useRequest from 'hooks/useRequest';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SkeletonCard from 'components/Skeleton/SkeletonCard';
import AddCard from 'components/Card/AddCard';
import { BACKGROUND_COLOR } from 'constants/postPageConstant';
import { MainPrimaryButton } from 'components/button/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import fetch from 'apis/api';

function PostPage({ backgroundColor }) {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const API_KEY = 'QNu5I163sHdbHYsEHdDTKeKJpAjaGtvtGpNw2G1xTEI';
  const target = useRef(null);
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundImageURL =
    'https://images.unsplash.com/photo-1699307152365-399bf53f55a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MjYxNjF8MHwxfGFsbHwxMHx8fHx8fDJ8fDE2OTk2ODg0OTB8&ixlib=rb-4.0.3&q=80&w=1080';
  const background = BACKGROUND_COLOR[backgroundColor];

  const { data, isLoading } = useRequest({
    deps: page,
    url: `https://api.unsplash.com/photos/?client_id=${API_KEY}&page=${page}&per_page=3`,
  });
  useEffect(() => {
    setCards((prev) => [...prev, ...data]);
  }, [page]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleDeleteButtonClick = async () => {
    try {
      const response = await fetch({
        method: 'delete',
        url: `/1-5/recipients/${id}/`,
      });
      if (response.status === 204) {
        alert('성공적으로 삭제되었습니다.');
        navigate('/list');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrashIconClick = async () => {
    try {
      const response = await fetch({
        method: 'delete',
        url: `/1-5/messages/${id}/`,
      });
      if (response.status === 204) {
        alert('성공적으로 삭제되었습니다.');
      }
      setCards((prev) => [...prev, ...cards]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1 }
      );
      observer.observe(target.current);
    }
  }, [isLoading]);

  return (
    <PostPageWrapper
      background={
        backgroundImageURL
          ? { type: 'url', backgroundImageURL }
          : { type: 'color', backgroundColor: background }
      }
    >
      {location.pathname === `/post/${id}/edit` ? (
        <DeleteButtonWrapper>
          <DeleteButton title="삭제하기" onClick={handleDeleteButtonClick} />
        </DeleteButtonWrapper>
      ) : null}

      <CardListWrapper>
        <AddCard />
        {cards?.map((item) =>
          isLoading ? (
            <SkeletonCard key={item.id} />
          ) : (
            <>
              <Card
                key={item.id}
                id={id}
                imageUrl={item.urls.small}
                onDelete={handleTrashIconClick}
              />
            </>
          )
        )}
        <Target ref={target} />
      </CardListWrapper>
    </PostPageWrapper>
  );
}
export default PostPage;

const DeleteButtonWrapper = styled.div`
  display: flex;
  width: 1200px;
  justify-content: flex-end;
`;

const DeleteButton = styled(MainPrimaryButton)`
  padding: 7px 16px;
  width: 92px;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  font-size: 16px;
  font-weight: 300;
`;

const PostPageWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100%vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding-top: 113px;
  ${({ background, theme }) =>
    background.type === 'url'
      ? `background-image: url(${background.backgroundImageURL})`
      : `background: ${theme[background.backgroundColor]}`};

  @media (max-width: 1248px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const CardListWrapper = styled.div`
  width: 1200px;
  height: 1000px;
  display: grid;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  column-gap: 24px;
  row-gap: 28px;
  ${({ theme }) => theme.tablet`
    row-gap: 16px;
    column-gap: 16px;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
  `}
  ${({ theme }) => theme.mobile`
    row-gap: 16px;
    column-gap: 16px;
    grid-template-columns: 1fr;
    place-items: center;
  `}
`;

const Target = styled.div`
  height: 1px;
`;
