import { React, useState } from 'react';
import styled from 'styled-components';
import EmojiPicker from 'emoji-picker-react';
import { OutlinedButton } from 'components/button/OutlinedButton';
import { ReactComponent as Icon } from 'assets/icons/emoji-add-icon.svg';

function Emoji() {
  const [showPicker, setShowPicker] = useState(false);

  const onEmojiclick = () => {
    setShowPicker(!showPicker);
  };
  return (
    <>
      <EmojiLayout>
        <OutlinedButton
          width={88}
          height={36}
          className="light"
          onClick={onEmojiclick}
        >
          <Icon />
          추가
        </OutlinedButton>
        {showPicker ? (
          <EmojiPickerLayout>
            <EmojiPicker />
          </EmojiPickerLayout>
        ) : (
          ''
        )}
      </EmojiLayout>
    </>
  );
}

export default Emoji;

const EmojiLayout = styled.div`
  position: relative;
  border: 1px solid gray;
  display: inline-flex;
  justify-content: center;
`;

const EmojiPickerLayout = styled.div`
  position: absolute;
  top: 4rem;
`;
