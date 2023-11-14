import Card from 'components/Card/Card';
import useRequest from 'hooks/useRequest';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SkeletonCard from 'components/Skeleton/SkeletonCard';
import AddCard from 'components/Card/AddCard';
import { BACKGROUND_COLOR } from 'constants/postPageConstant';
import { useParams } from 'react-router-dom';

function PostPage() {
  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(1);
  const [background, setBackground] = useState();
  const [backgroundImageURL, setBackgroundImageURL] = useState();
  // const LIMIT = 3;
  const target = useRef(null);
  const params = useParams();
  const recipientId = params.id;

  // const query = `?limit=${LIMIT}&offset=${offset}`;
  const { data, isLoading } = useRequest({
    url: `/1-5/recipients/${recipientId}/`,
  });

  useEffect(() => {
    setBackground(data?.backgroundColor);
    setBackgroundImageURL(data?.backgroundImageURL);
  });

  const backgroundColor = BACKGROUND_COLOR[background];

  useEffect(() => {
    console.log(data);
    if (data?.results) {
      setCards((prev) => [...prev, ...data.results]);
    }
  }, [offset]);

  const loadMore = () => {
    setOffset((prev) => prev + 3);
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
          : { type: 'color', backgroundColor: backgroundColor }
      }
    >
      <CardListWrapper>
        <AddCard />
        {cards?.map((item) =>
          isLoading ? (
            <SkeletonCard key={item.id} />
          ) : (
            <>
              <Card key={item.id} imageUrl={item.profileImageURL} />
            </>
          )
        )}
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
  ${({ background, theme }) =>
    background.type === 'url'
      ? `background-image: url(${background.backgroundImageURL})`
      : `background: ${theme[background.backgroundColor]}`};

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
