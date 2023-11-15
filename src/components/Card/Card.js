import CoworkerBadge from 'components/Badges/CoworkerBadge';
import FamilyBadge from 'components/Badges/FamilyBadge';
import FriendBadge from 'components/Badges/FriendBadge';
import OtherBadge from 'components/Badges/OtherBadge';
import styled from 'styled-components';
import changeDateFormat from 'utils/calcCreateAt';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash-icon.svg';
import { OutlinedButton } from 'components/button/OutlinedButton';
import { useLocation } from 'react-router-dom';

function Card({
  imageUrl,
  createdAt,
  content,
  sender,
  relationship,
  font = 'Noto Sans',
  messageId,
  id,
  onDelete,
}) {
  const location = useLocation();
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
  const handleFontType = (fontType) => {
    switch (fontType) {
      case 'Noto Sans':
        return 'Noto Sans KR';
      case 'Pretendard':
        return 'Pretendard, Noto Sans KR';
      case '나눔명조':
        return 'Nanum Myeongjo, Noto Sans KR';
      case '나눔손글씨 손편지체':
        return 'Handletter, Noto Sans KR';
    }
  };

  return (
    <CardWrapper fontStyle={handleFontType(font)}>
      <ProfileWrapper>
        <ProfileBox>
          <ProfileImage src={imageUrl} alt="card-profile" />
          <ProfileContentWrapper>
            <ProfileNameWrapper>
              <ProfileContentText>From.</ProfileContentText>
              <ProfileContentText weight={700}>{sender}</ProfileContentText>
            </ProfileNameWrapper>
            {handleBadge(relationship)}
          </ProfileContentWrapper>
        </ProfileBox>
        {location.pathname === `/post/${id}/edit` ? (
          <OutlinedButton
            width={40}
            height={40}
            onClick={() => onDelete(messageId)}
          >
            <TrashIcon />
          </OutlinedButton>
        ) : null}
      </ProfileWrapper>
      <CardContent>{content}</CardContent>
      <CardTimeStamp>{timeStamp}</CardTimeStamp>
    </CardWrapper>
  );
}

export default Card;

const ProfileBox = styled.div`
  display: flex;
  gap: 14px;
`;

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
  font-family: ${({ fontStyle }) => fontStyle};
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
  justify-content: space-between;
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
  font-weight: ${({ weight }) => weight || 400};
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
