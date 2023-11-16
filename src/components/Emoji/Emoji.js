import { useState } from 'react';
import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';
import { OutlinedButton } from 'components/Button/OutlinedButton';
import { ReactComponent as EddEmojiIcon } from 'assets/icons/emoji-add-icon.svg';
import ArrowDownButton from 'components/Button/ArrowDownButton';
import { useParams } from 'react-router-dom';
import useRequest from 'hooks/useRequest';
import EmojiBedge from 'components/Badges/EmojiBedge';

function Emoji() {
  const [showPicker, setShowPicker] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const { id } = useParams();

  const { data } = useRequest({
    url: `/1-5/recipients/${id}/`,
  });

  const onAddEmojiClick = () => {
    setShowPicker(!showPicker);
    setShowEmoji(false);
  };

  const onArrowDownClick = () => {
    setShowEmoji(!showEmoji);
    setShowPicker(false);
  };

  return (
    <>
      {data.topReactions &&
        data.topReactions.map((reaction) => (
          <TopReactions key={reaction.id}>
            <EmojiBedge>
              {reaction.emoji} {reaction.count}{' '}
            </EmojiBedge>
          </TopReactions>
        ))}
      <EmojiLayout>
        <ArrowDownButton onClick={onArrowDownClick} />
        {showEmoji && <EmojiExpandLayout />}
        <OutlinedButton
          width={88}
          height={37}
          className="light"
          onClick={onAddEmojiClick}
        >
          <EddEmojiIcon />
          추가
        </OutlinedButton>
        {showPicker && (
          <EmojiPickerLayout>
            <EmojiPicker />
          </EmojiPickerLayout>
        )}
      </EmojiLayout>
    </>
  );
}

export default Emoji;

const EmojiLayout = styled.div`
  display: inline-flex;
  position: relative;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
`;

const EmojiPickerLayout = styled.div`
  position: absolute;
  top: 5rem;
`;

const TopReactions = styled.span``;

const EmojiExpandLayout = styled.div`
  position: absolute;
  top: 5rem;
  right: 52%;
  width: 30rem;
  height: 13rem;
  border-radius: 8px;
  border: 1px solid #b6b6b6;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
`;
