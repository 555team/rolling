import fetch from 'apis/api';
import { ReactComponent as EddEmojiIcon } from 'assets/icons/emoji-add-icon.svg';
import EmojiBedge from 'components/Badges/EmojiBedge';
import ArrowDownButton from 'components/Button/ArrowDownButton';
import { OutlinedButton } from 'components/Button/OutlinedButton';
import EmojiPicker from 'emoji-picker-react';
import useRequest from 'hooks/useRequest';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function Emoji() {
  const [showPicker, setShowPicker] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [emojiList, setEmojiList] = useState([]);
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

  const fetchReactions = async () => {
    const { data } = await fetch({ url: `1-5/recipients/${id}/reactions/` });
    setEmojiList(data?.results);
    console.log(emojiList);
  };

  // emoji가 선택될때마다 실행되는 핸들러
  const handleEmojiClick = async (emoji) => {
    // 서버에 내가 선택한 이모지를 추가
    await fetch({
      url: `1-5/recipients/${id}/reactions/`,
      method: 'post',
      data: { emoji: emoji, type: 'increase' },
    });

    // 서버에 저장되어있는 이모지 리스트 fetch
    fetchReactions();
  };

  useEffect(() => {
    fetchReactions();
  }, []);

  return (
    <>
      {console.log(emojiList)}
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
        {showEmoji && (
          <EmojiExpandLayout>
            {emojiList &&
              emojiList.map((reaction) => (
                <TopReactions key={reaction.id}>
                  <EmojiBedge>
                    {reaction.emoji} {reaction.count}{' '}
                  </EmojiBedge>
                </TopReactions>
              ))}
          </EmojiExpandLayout>
        )}
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
            <EmojiPicker
              onEmojiClick={({ emoji }) => handleEmojiClick(emoji)}
            />
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
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-contents: center;
  align-items: center;
  padding: 10px;
  top: 5rem;
  right: 52%;
  width: 300px;
  height: 130ox;
  border-radius: 8px;
  border: 1px solid #b6b6b6;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.08);
`;
