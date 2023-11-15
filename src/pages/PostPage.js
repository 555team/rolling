import Card from 'components/Card/Card';
import styled, { css } from 'styled-components';
import AddCard from 'components/Card/AddCard';
import useRequest from 'hooks/useRequest';
import { BACKGROUND_COLOR } from 'constants/postPageConstant';
import { useEffect, useRef, useState } from 'react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { MainPrimaryButton } from 'components/button/Button';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import fetch from 'apis/api';

function PostPage() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(0);
  const target = useRef(null);
  const LIMIT = 3;
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useRequest({
    url: `/1-5/recipients/${id}/`,
  });

  const backgroundColor = BACKGROUND_COLOR[data?.backgroundColor];
  const backgroundImageURL = data?.backgroundImageURL;

  const { data: messages, isLoading } = useRequest({
    url: `/1-5/recipients/${id}/messages/`,
    params: { limit: LIMIT, offset },
    deps: offset,
  });

  const { fetcher: refetch } = useRequest({
    url: `/1-5/recipients/${id}/messages/`,
    skip: true,
  });

  const { data: recipientDeleteResponse, fetcher } = useRequest({
    method: 'delete',
    url: `/1-5/recipients/${id}/`,
    skip: true,
  });

  useEffect(() => {
    if (messages.results) {
      setCards((prev) => [...prev, ...messages.results]);
    }
  }, [messages]);

  useEffect(() => {
    if (offset === 0) {
      observe(target.current);
    }
    const count = messages.results?.length;
    if (count === 0) {
      unobserve(target.current);
    }
  }, [messages.results?.length, offset]);

  useEffect(() => {
    if (isLoading) {
      unobserve(target.current);
    } else if (messages.next !== null) {
      observe(target.current);
    }
  }, [isLoading]);

  const handleDeleteButtonClick = async () => {
    try {
      await fetcher();
      if (recipientDeleteResponse.status === 204) {
        alert('성공적으로 삭제되었습니다.');
        navigate('/list');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleTrashIconClick = async (messageId) => {
    try {
      const response = await fetch({
        method: 'delete',
        url: `/1-5/messages/${messageId}/`,
      });
      if (response.status === 204) {
        alert('성공적으로 삭제 했습니다.');
        const { data } = await refetch();
        setCards(data?.results);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const [observe, unobserve] = useIntersectionObserver(() => {
    if (!isLoading) {
      setOffset((prev) => prev + 3);
    }
  });

  return (
    <PostPageWrapper
      backgrounds={backgroundImageURL}
      backgroundColor={backgroundColor || ''}
    >
      {location.pathname === `/post/${id}/edit` ? (
        <DeleteButtonWrapper>
          <DeleteButton title="삭제하기" onClick={handleDeleteButtonClick} />
        </DeleteButtonWrapper>
      ) : null}

      <CardListWrapper>
        {location.pathname === `/post/${id}/edit` ? null : (
          <Link to={`/post/${id}/message`}>
            <AddCard />
          </Link>
        )}
        {cards &&
          cards?.map((item) => (
            <Card
              key={item.id}
              imageUrl={item.profileImageURL}
              createdAt={item.createdAt}
              content={item.content}
              sender={item.sender}
              relationship={item.relationship}
              font={item.font}
              id={id}
              messageId={item.id}
              onDelete={handleTrashIconClick}
            />
          ))}
      </CardListWrapper>
      <Target ref={target} />
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
  font-weight: 400;
`;

const PostPageWrapper = styled.div`
  display: flex;
  padding-top: 70px;
  padding-bottom: 20px;
  width: 100vw;
  height: 100%vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  ${({ backgrounds, backgroundColor, theme }) =>
    backgrounds
      ? css`
          background-image: url(${backgrounds});
        `
      : css`
          background-color: ${theme[backgroundColor]};
        `}

  @media (max-width: 1248px) {
    padding-left: 24px;
    padding-right: 24px;
  }
`;

const CardListWrapper = styled.div`
  width: 1200px;
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
  width: 100%;
  height: 1px;
`;
