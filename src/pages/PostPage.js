/* eslint-disable no-unused-vars */
import Card from 'components/Card/Card';
import styled, { css } from 'styled-components';
import AddCard from 'components/Card/AddCard';
import useRequest from 'hooks/useRequest';
import { useParams } from 'react-router-dom';
import { BACKGROUND_COLOR } from 'constants/postPageConstant';
import { useEffect, useRef, useState } from 'react';
import fetch from 'apis/api';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

function PostPage() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [messages, setMessages] = useState({});
  const [backgroundColor, setBackgroundColor] = useState('');
  const [backgroundImageURL, setBackgroundImageURL] = useState('');
  const [offset, setOffset] = useState(1);
  const LIMIT = 3;
  const target = useRef(null);
  const [observe, unobserve] = useIntersectionObserver(() => {
    setOffset((prev) => prev + 3);
  });

  const { data } = useRequest({
    url: `/1-5/recipients/${id}/`,
  });

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
  console.log(messages);

  useEffect(() => {
    fetchMessage();
  }, [offset]);

  useEffect(() => {
    if (offset === 1) {
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
      {console.log({ backgroundColor })}
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
            />
          ))}
        <Target ref={target} />
      </CardListWrapper>
    </PostPageWrapper>
  );
}
export default PostPage;

const PostPageWrapper = styled.div`
  display: flex;
  padding-top: 70px;
  width: 100vw;
  height: 100%vw;
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
    padding: 0px 24px;
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
  margin-top: 113px;
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
