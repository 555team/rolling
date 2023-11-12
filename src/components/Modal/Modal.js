import styled from 'styled-components';
import FriendBadge from 'components/Badges/FriendBadge';
import tempImg from 'assets/img/no-profile.png';

function Modal({ info, onClick }) {
  // api 보면 info 로 들어갈 속성에서
  // sender, profileImageURL, relationship, content, font, createdAt 받아옴
  // 아직 data 받아오는 코드가 없어서 임의로 내용 작성했습니다.

  const {
    sender = '익명',
    profileImageURL = null,
    relationship = 'friend',
    content = '내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.내용이 없습니다.',
    font = 'Noto Sans',
    createdAt = null,
  } = info;
  return (
    <ModalLayout>
      <ProfileWrapper>
        <ProfileImage src={profileImageURL ?? tempImg} alt="card-profile" />
        <ProfileContentWrapper>
          <ProfileNameWrapper>
            <ProfileContentText>From. </ProfileContentText>
            <ProfileContentText weight={700}>{sender}</ProfileContentText>
          </ProfileNameWrapper>
          {relationship === 'friend' && <FriendBadge />}
        </ProfileContentWrapper>
        <CardTimeStamp>{createdAt ?? '2023.07.08'}</CardTimeStamp>
      </ProfileWrapper>

      <CardContent font={font}>{content}</CardContent>

      <Button onClick={onClick}>확인</Button>
    </ModalLayout>
  );
}

export default Modal;

const ModalLayout = styled.div`
  position: fixed;
  background-color: white;
  border-radius: 16px;
  width: 600px;
  height: 476px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 999;
`;

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 40px 40px 20px 40px;
  width: 100%;
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
    height: 240px;
  margin: 16px 40px 24px;
  text-overflow: ellipsis;
  overflow-y: scroll;
  word-break: break-all;
  font-size: 18px;
  font-family = ${(props) => props.font};
  line-height: 26px;
  letter-spacing: -0.18px;
  display: -webkit-box;
`;

const CardTimeStamp = styled.span`
  color: ${({ theme }) => theme['--gray-400']};
  position: absolute;
  right: 40px;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.06px;
`;

const Button = styled.button`
  background-color: ${({ theme }) => theme['--purple-600']};
  color: white;
  width: 120px;
  padding: 7px 16px;
  border-radius: 6px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
`;
