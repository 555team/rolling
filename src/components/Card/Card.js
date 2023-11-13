import CoworkerBadge from 'components/Badges/CoworkerBadge';
import FamilyBadge from 'components/Badges/FamilyBadge';
import FriendBadge from 'components/Badges/FriendBadge';
import OtherBadge from 'components/Badges/OtherBadge';
import styled from 'styled-components';
import changeDateFormat from 'utils/calcCreateAt';

function Card({ imageUrl, createdAt, content, sender, relationship }) {
  const timeStamp = changeDateFormat(createdAt, 'YYYY.MM.DD');
  const handleBadge = (relationType) => {
    switch (relationType) {
      case '가족':
        return <FamilyBadge />;
      case '친구':
        return <FriendBadge />;
      case '동료':
        return <CoworkerBadge />;
      case '지인':
        return <OtherBadge />;
    }
  };

  return (
    <CardWrapper>
      <ProfileWrapper>
        <ProfileImage src={imageUrl} alt="card-profile" />
        <ProfileContentWrapper>
          <ProfileNameWrapper>
            <ProfileContentText>From.</ProfileContentText>
            <ProfileContentText weight={700}>{sender}</ProfileContentText>
          </ProfileNameWrapper>
          {handleBadge(relationship)}
        </ProfileContentWrapper>
      </ProfileWrapper>
      <CardContent>{content}</CardContent>
      <CardTimeStamp>{timeStamp}</CardTimeStamp>
    </CardWrapper>
  );
}

export default Card;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 384px;
  height: 280px;
  padding: 28px 24px;
  border-radius: 16px;
  background: ${({ theme }) => theme.white};
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
  ${({ theme }) => theme.tablet`
    width: 352px;
    height: 284px;
  `}

  ${({ theme }) => theme.mobile`
    width: 320px;
    height: 230px;
  `}
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
  ${({ theme }) => theme.mobile`
    font-size: 18px;
  `}
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
  max-width: 336px;
  height: 106px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  ${({ theme }) => theme.tablet`
    width: 304px;
    height: 110px;
  `}
  ${({ theme }) => theme.mobile`
    width: 272px;
    height: 56px;
    font-size: 15px;
    line-height: 22px;
  `}
`;

const CardTimeStamp = styled.span`
  color: ${({ theme }) => theme['--gray-400']};
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.06px;
`;
