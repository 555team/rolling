import FriendBadge from 'components/badges/FriendBadge';
import styled from 'styled-components';

function Card() {
  return (
    <CardWrapper>
      <ProfileWrapper>
        <ProfileImage
          src="https://plus.unsplash.com/premium_photo-1683910767532-3a25b821f7ae?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
          alt="card-profile"
        />
        <ProfileContentWrapper>
          <ProfileNameWrapper>
            <ProfileContentText>From.</ProfileContentText>
            <ProfileContentText weight={700}>Wade</ProfileContentText>
          </ProfileNameWrapper>
          <FriendBadge />
        </ProfileContentWrapper>
      </ProfileWrapper>
      <CardContent>
        코로나가 또다시 기승을 부리는 요즘이네요. 건강, 체력 모두 조심 또
        하세요!
      </CardContent>
      <CardTimeStamp>2023.07.08</CardTimeStamp>
    </CardWrapper>
  );
}

export default Card;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 384px;
  max-height: 280px;
  padding: 28px 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.white};
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme['--gray-200']};
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme['--gray-200']};
`;

const ProfileContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const ProfileNameWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

const ProfileContentText = styled.span`
  color: ${({ theme }) => theme.black};
  font-size: 20px;
  font-style: normal;
  font-weight: ${(props) => props.weight || 400};
  line-height: 24px;
`;

const CardContent = styled.p`
  color: ${({ theme }) => theme['--gray-600']};
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  font-size: 18px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: -0.18px;
  width: 336px;
  height: 106px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const CardTimeStamp = styled.span`
  color: ${({ theme }) => theme['--gray-400']};
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.06px;
`;
