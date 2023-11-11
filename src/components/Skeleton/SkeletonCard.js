import styled from 'styled-components';

function SkeletonCard() {
  return (
    <SkeletonWrapper>
      <SkeletonProfileWrapper>
        <SkeletonAvatar>
          <Shimmer />
        </SkeletonAvatar>
        <SkeletonProfileContentWrapper>
          <SkeletonProfileNameWrapper>
            <SkeletonTitle>
              <Shimmer />
            </SkeletonTitle>
            <SkeletonTitle>
              <Shimmer />
            </SkeletonTitle>
          </SkeletonProfileNameWrapper>
          <SkeletonText>
            <Shimmer />
          </SkeletonText>
        </SkeletonProfileContentWrapper>
      </SkeletonProfileWrapper>
      <SkeletonText>
        <Shimmer />
      </SkeletonText>
      <SkeletonText>
        <Shimmer />
      </SkeletonText>
    </SkeletonWrapper>
  );
}

export default SkeletonCard;

const Shimmer = styled.div`
  width: 50%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  transform: skewX(-20deg);
  box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.05);
  animation: loading 1.7s infinite;
  @keyframes loading {
    0% {
      transform: translateX(-150%);
    }
    50% {
      transform: translateX(-60%);
    }
    100% {
      transform: translate(150%);
    }
  }
`;

const Skeleton = styled.div`
  background: ${({ theme }) => theme['--gray-300']};
  margin: 10px 0;
  border-radius: 4px;
  width: ${({ width }) => width};
`;

const SkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 384px;
  height: 280px;
  padding: 28px 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.white};
`;

const SkeletonProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme['--gray-200']};
`;

const SkeletonAvatar = styled(Skeleton)`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  overflow: hidden;
`;

const SkeletonProfileNameWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const SkeletonProfileContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const SkeletonTitle = styled(Skeleton)`
  width: 100px;
  height: 20px;
  overflow: hidden;
`;

const SkeletonText = styled(Skeleton)`
  width: 100%;
  height: 12px;
  overflow: hidden;
`;
