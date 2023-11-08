import React from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as Pattern } from 'assets/icons/card-list-pattern-icon.svg';
import { mockData } from './mockData';

const CardComponent = () => {
  const { name, backgroundColor, messageCount, recentMessages, topReactions } =
    mockData;

  return (
    <CardContainer backgroundColor={backgroundColor}>
      <PatternSVG />
      <Name>To. {name}</Name>
      <Profile>
        {recentMessages.map((message) => (
          <ProfileImg
            key={message.id}
            src={message.profileImageURL}
            alt={`${message.sender}'s profile`}
          />
        ))}
        <ProfileCount>+{messageCount - recentMessages.length}</ProfileCount>
      </Profile>
      <MessageCount>
        <StyledSpan>{messageCount}</StyledSpan>명이 작성했어요!
      </MessageCount>
      <CardFooter>
        {topReactions.map((reaction) => (
          <TopReactions key={reaction.id}>
            {reaction.emoji} {reaction.count}
          </TopReactions>
        ))}
      </CardFooter>
    </CardContainer>
  );
};

export default CardComponent;

const fontStyles = css`
  line-height: 150%;
  letter-spacing: -0.16px;
  color: ${({ theme }) => theme['--gray-700']};
`;

const CardContainer = styled.div`
  ${({ theme, backgroundColor }) => css`
    width: 275px;
    height: 260px;
    background-color: ${theme[colorMap[backgroundColor]]};
    border-radius: 16px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.08);
    padding: 30px 24px 20px;
    position: relative;
  `}
`;

const PatternSVG = styled(Pattern)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const Name = styled.div`
  ${fontStyles}
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme['--gray-900']};
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin: 12px 0;
`;

const imgStyles = css`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1.5px solid ${({ theme }) => theme['white']};
  background: ${({ theme }) => theme['white']};
`;

const ProfileImg = styled.img`
  ${imgStyles}
  &:not(:first-child) {
    margin-left: -12px;
  }
`;

const ProfileCount = styled.div`
  ${fontStyles}
  ${imgStyles}
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33px;
  padding: 5px 6px;
  border-radius: 30px;
  margin-left: -12px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme['--gray-500']};
`;

const MessageCount = styled.div`
  ${fontStyles}
  font-size: 16px;
  font-weight: 400;
`;

const StyledSpan = styled.span`
  ${fontStyles}
  font-size: 16px;
  font-weight: 700;
`;

const CardFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 16px;
  margin-top: 43px;
  border-top: 1px solid ${({ theme }) => theme['--gray-300']};
`;

const TopReactions = styled.span``;

const colorMap = {
  purple: '--purple-200',
  green: '--green-200',
  blue: '--blue-200',
  beige: '--orange-200',
};
