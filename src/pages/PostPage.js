import Card from 'components/Card/Card';
import styled, { css } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';
import AddCard from 'components/Card/AddCard';
import useRequest from 'hooks/useRequest';
import { BACKGROUND_COLOR } from 'constants/postPageConstant';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import useIntersectionObserver from 'hooks/useIntersectionObserver';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import fetch from 'apis/api';
import HeaderService from 'components/HeaderService/HeaderService';
import openToast from 'utils/openToast';
import CardModal from 'components/Modal/CardModal';
import { MainPrimaryButton, SecondaryButton } from 'components/Button/Button';
import SkeletonCard from 'components/Skeleton/SkeletonCard';

function PostPage() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [offset, setOffset] = useState(0);
  const target = useRef(null);
  const LIMIT = 3;
  const navigate = useNavigate();
  const location = useLocation();
  const isEditPage = location.pathname === `/post/${id}/edit`;

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

  useLayoutEffect(() => {
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
      if (
        window.confirm(
          '정말 삭제하시겠습니까? 모든 롤링페이지 메세지가 사라집니다.'
        )
      ) {
        const response = await fetch({
          method: 'delete',
          url: `/1-5/recipients/${id}/`,
        });
        if (response.status === 204) {
          openToast({ type: 'success', txt: '성공적으로 삭제 했습니다!!' });
          navigate('/list');
        }
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
        openToast({ type: 'success', txt: '성공적으로 삭제 했습니다!!' });
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

  const [isShown, setIsShown] = useState(false);
  const [modalInfo, setModalInfo] = useState({});
  const onClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsShown(false);
      setModalInfo({});
    }
  };

  return (
    <PostPageWrapper
      backgrounds={backgroundImageURL}
      backgroundColor={backgroundColor || ''}
    >
      {isShown && (
        <CardModal
          key={modalInfo.key + 'modal'}
          data={modalInfo}
          onClose={onClose}
        />
      )}
      <HeaderServiceWrapper>
        <HeaderService card={data} />
      </HeaderServiceWrapper>
      {isEditPage ? (
        <DeleteButtonWrapper>
          <SaveButton
            title="저장하기"
            onClick={() => navigate(`/post/${id}`)}
          />
          <DeleteButton title="삭제하기" onClick={handleDeleteButtonClick} />
        </DeleteButtonWrapper>
      ) : null}
      {isEditPage ? null : (
        <GoToEditButtonWrapper>
          <GotoEditButton
            title="수정하기"
            onClick={() => navigate(`/post/${id}/edit`)}
          />
        </GoToEditButtonWrapper>
      )}
      {isEditPage && cards?.length === 0 ? (
        <EmptyPageAlert>
          <EmptyMessage>메세지가 없습니다.</EmptyMessage>
          <EmptyContent>
            메세지를 남겨 마음을 표현해보세요!
            <br />
            Rolling과 함께라면 어렵지 않아요.
          </EmptyContent>
          <Link to={`/post/${id}/message`}>
            <GotoMessageButton title="메세지 남겨보기" />
          </Link>
        </EmptyPageAlert>
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
              onClick={() => {
                if (location.pathname === `/post/${id}/edit`) return;
                setModalInfo(() => {
                  return { ...item };
                });
                setIsShown(true);
              }}
            />
          ))}
        {isLoading
          ? messages?.results?.map((item) => <SkeletonCard key={item.id} />)
          : null}
        <Target ref={target} />
      </CardListWrapper>
    </PostPageWrapper>
  );
}
export default PostPage;

const EmptyPageAlert = styled.div`
  display: flex;
  padding: 70px 60px 40px 60px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background-image: url('/imgs/heart.png');
  background-size: cover;
`;

const EmptyMessage = styled.p`
  margin-top: 20px;
  padding-top: 10px;
  width: 400px;
  font-weight: 700;
  font-size: 27px;
  text-align: center;
  color: black;
  line-height: 40px;
`;

const EmptyContent = styled.p`
  margin-bottom: 20px;
  width: 400px;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  text-align: center;
  color: ${(props) => props.theme['--gray-700']};
  line-height: 27px;
`;

const HeaderServiceWrapper = styled.div`
  width: 100%;
  height: 63px;
  position: sticky;
  top: 62px;
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  width: 1200px;
  justify-content: flex-end;
  gap: 10px;
  ${({ theme }) => theme.tablet`
    width: 720px;
  `}
  ${({ theme }) => theme.mobile`
    width: 320px;
    justify-content: center;
  `}
`;

const DeleteButton = styled(MainPrimaryButton)`
  padding: 7px 16px;
  width: 130px;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
`;

const GotoEditButton = styled(MainPrimaryButton)`
  padding: 7px 16px;
  width: 130px;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
`;

const GotoMessageButton = styled(SecondaryButton)`
  width: 150px;
  height: 40px;
  border-radius: 6px;
  text-align: center;
  font-size: 16px;
  font-weight: 400;
`;

const GoToEditButtonWrapper = styled.div`
  display: flex;
  width: 1200px;
  justify-content: flex-end;
  ${({ theme }) => theme.tablet`
    width: 720px;
  `}
  ${({ theme }) => theme.mobile`
    width: 320px;
  `}
`;

const PostPageWrapper = styled.div`
  display: flex;
  padding-top: 70px;
  padding-bottom: 20px;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  ${({ backgrounds, backgroundColor, theme }) =>
    backgrounds
      ? css`
          background-image: url(${backgrounds});
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
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
  padding: 0px 20px;
  width: 1240px;
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
    width: 760px;
    row-gap: 16px;
    column-gap: 16px;
    grid-template-columns: repeat(2, 1fr);
    place-items: center;
  `}
  ${({ theme }) => theme.mobile`
    width:100%;
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
const SaveButton = styled(DeleteButton)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
