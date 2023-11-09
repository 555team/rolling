import Card from 'components/Card/Card';
import useRequest from 'hooks/useRequest';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import spinner from '../assets/img/loading-spinner.gif';

function Spinner() {
  return (
    <div>
      <img src={spinner} alt="loading-spinner" />
    </div>
  );
}

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
        {cards?.map((item) => (
          <Card key={item.id} imageUrl={item.urls.small} />
        ))}
        {isLoading ? <Spinner /> : null}
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
`;

const CardListWrapper = styled.div`
  width: 1200px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  column-gap: 24px;
  row-gap: 28px;
`;

const Target = styled.div`
  height: 1px;
`;
