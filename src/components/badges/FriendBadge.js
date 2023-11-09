import styled from 'styled-components';

const Badge = styled.div`
  display: inline-flex;
  padding: 0px 8px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${(props) => props.theme['--blue-100']};
  color: ${(props) => props.theme['--blue-500']};
  border-radius: 4px;
  line-height: 20px;
  font-size: 14px;
`;

function FriendBadge() {
  return <Badge>친구</Badge>;
}

export default FriendBadge;
