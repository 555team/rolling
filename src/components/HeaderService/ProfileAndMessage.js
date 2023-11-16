import styled, { css } from 'styled-components';
import theme from 'styles/theme';

function ProfileAndMessage({ card }) {
  return card.messageCount > 0 ? (
    <Wrapper>
      <Profile>
        {card.recentMessages.map((message) => (
          <ProfileImg
            key={message.id}
            src={message.profileImageURL}
            alt={`${message.sender}'s profile`}
          />
        ))}
        <ProfileCount>
          +{card.messageCount - card.recentMessages.length}
        </ProfileCount>
      </Profile>
      <MessageCount>
        <StyledSpan>{card.messageCount}</StyledSpan>
        명이 작성했어요!
      </MessageCount>
      <VerticalLine />
    </Wrapper>
  ) : (
    <></>
  );
}

export default ProfileAndMessage;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;

  ${({ theme }) => theme.tablet`
    display: none;
  `};
`;
const VerticalLine = styled.div`
  width: 1px;
  height: 28px;
  border-right: 1px solid ${theme['--gray-200']};
  margin: 0 2px 0 28px;
`;

const imgStyles = css`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme['white']};
  background: ${({ theme }) => theme['white']};
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 12px 0;
`;

const ProfileImg = styled.img`
  ${imgStyles}
  &:not(:first-child) {
    margin-left: -12px;
  }
`;

const ProfileCount = styled.div`
  ${imgStyles};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -12px;
  border-color: #e3e3e3;

  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: #484848;
  line-height: 28px;
`;

const MessageCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  line-height: 27px;
  font-size: 18px;
  font-weight: 400;
  color: ${theme['--gray-900']};
`;

const StyledSpan = styled.span`
  line-height: 27px;
  font-size: 18px;
  font-weight: 700;
  color: ${theme['--gray-900']};
`;
