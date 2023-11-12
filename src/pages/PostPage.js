import Card from 'components/Card/Card';
import useRequest from 'hooks/useRequest';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SkeletonCard from 'components/Skeleton/SkeletonCard';
import AddCard from 'components/Card/AddCard';
import Modal from 'components/Modal/Modal';

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

  const [showModal, setShowModal] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const openModal = (e) => {
    setShowModal(true);
    setModalInfo((prev) => ({
      ...prev,
      ...e.target?.dataset?.item,
      key: e.target?.dataset?.item?.key + 'modal',
    }));
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <PostPageWrapper>
      {showModal && (
        <>
          <ModalContainer onClick={closeModal}>
            <Modal info={modalInfo} onClick={closeModal} />
          </ModalContainer>
        </>
      )}
      <CardListWrapper>
        <AddCard />
        {cards?.map((item) =>
          isLoading ? (
            <SkeletonCard key={item.id} />
          ) : (
            <Button key={item.id} data-item={item} onClick={openModal}>
              <Card imageUrl={item.urls.small} />
            </Button>
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

const Button = styled.button`
  text-align: left;
`;
const ModalContainer = styled.div`
  z-index: 100;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`;
