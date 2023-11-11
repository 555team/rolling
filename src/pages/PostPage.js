import Card from 'components/Card/Card';
import useRequest from 'hooks/useRequest';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SkeletonCard from 'components/Skeleton/SkeletonCard';

function PostPage() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const API_KEY = 'QNu5I163sHdbHYsEHdDTKeKJpAjaGtvtGpNw2G1xTEI';
  const target = useRef(null);

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
    <PostPageWrapper>
      <CardListWrapper>
        {cards?.map((item) =>
          isLoading ? (
            <SkeletonCard key={item.id} />
          ) : (
            <Card key={item.id} imageUrl={item.urls.small} />
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
  width: 100vw;
  height: 100% vh;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme['--orange-200']};
  @media (max-width: 1248px) {
    padding: 0px 24px;
  }
`;

const CardListWrapper = styled.div`
  width: 1200px;
  display: grid;
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
