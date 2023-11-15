/* eslint-disable no-unused-vars */
import Card from 'components/Card/Card';
import styled, { css } from 'styled-components';
import AddCard from 'components/Card/AddCard';
import useRequest from 'hooks/useRequest';
import { BACKGROUND_COLOR } from 'constants/postPageConstant';
import { useEffect, useRef, useState } from 'react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { MainPrimaryButton } from 'components/button/Button';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import fetch from 'apis/api';

function PostPage() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [messages, setMessages] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('');
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const [offset, setOffset] = useState(0);
  const target = useRef(null);
  const LIMIT = 3;
  const [observe, unobserve] = useIntersectionObserver(() => {
    setOffset((prev) => prev + 3);
  });
  const navigate = useNavigate();
  const location = useLocation();

  const { data } = useRequest({
    url: `/1-5/recipients/${id}/`,
  });

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

  useEffect(() => {
    if (data) {
      setBackgroundColor(BACKGROUND_COLOR[data?.backgroundColor]);
      setBackgroundImageURL(data.backgroundImageURL);
    }
  }, [data]);

  const fetchMessage = async () => {
    const response = await fetch({
      url: `/1-5/recipients/${id}/messages/`,
      params: { limit: LIMIT, offset },
    });
    const { data } = response;
    if (data?.results) {
      setCards((prev) => [...prev, ...data.results]);
    }
    setMessages(data);
  };

  useEffect(() => {
    fetchMessage();
  }, [offset]);

  useEffect(() => {
    if (offset === 0) {
      observe(target.current);
    }
    const count = messages.results?.length;
    if (count === 0) {
      unobserve(target.current);
    }
  }, [messages]);

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
        <AddCard />
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
            />
          ))}
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
  padding-top: 70px;
  width: 100vw;
  height: 100%vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
