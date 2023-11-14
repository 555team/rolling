/* eslint-disable no-unused-vars */
import Card from 'components/Card/Card';
import styled from 'styled-components';
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
  const [limit, setLimit] = useState(5);
  const target = useRef(null);
  const [observe, unobserve] = useIntersectionObserver(() => {
    setLimit(3);
    setOffset((prev) => prev + 3);
  });

  const { data, isLoading } = useRequest({
    url: `/1-5/recipients/${id}/`,
  });

  useEffect(() => {
    if (data && !isLoading) {
      setBackgroundColor(BACKGROUND_COLOR[data?.backgroundColor]);
      setBackgroundImageURL(data.backgroundImageURL);
    }
  }, [data]);

  // let backgroundColor = BACKGROUND_COLOR[data?.backgroundColor];
  // let backgroundImageURL = data?.backgroundImageURL;

  const fetchMessage = async () => {
    const response = await fetch({
      url: `/1-5/recipients/${id}/messages/`,
      params: { limit, offset },
    });
    const { data } = response;
    setCards(data?.results);
    setMessages(data);
  };
  console.log(messages);

  useEffect(() => {
    fetchMessage();
  }, [data]);

  useEffect(() => {
    if (offset === 1) {
      observe(target.current);
    }
    const count = messages.results?.length;
    console.log(count);
    const totalCount = messages.count;
    console.log(totalCount);
    if (count === 0 || totalCount <= count) {
      unobserve(target.current);
    }
  }, [messages]);

  useEffect(() => {
    if (messages && messages.results) {
      setCards((prev) => [...prev, ...messages.results]);
    }
  }, [offset]);

  return (
    <PostPageWrapper
      $backgrounds={
        backgroundImageURL
          ? { type: 'url', backgroundImageURL }
          : { type: 'color', backgroundColor }
      }
    >
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
  ${({ $backgrounds, theme }) =>
    $backgrounds.type === 'url'
      ? `background-image: url(${$backgrounds.backgroundImageURL})`
      : `background: ${theme[$backgrounds.backgroundColor]}`};
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
  height: 10px;
`;
