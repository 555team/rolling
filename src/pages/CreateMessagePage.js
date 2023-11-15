import styled, { css } from 'styled-components';
import { MainPrimaryButton } from 'components/Button/Button';
import { useEffect, useState } from 'react';
import useRequest from 'hooks/useRequest';
import { useNavigate, useParams } from 'react-router-dom';
import MessageForm from 'components/CreateMessage/MessageForm';

function CreateMessagePage() {
  const { recipientId } = useParams();
  const navigate = useNavigate();

  const INITIAL_VALUES = {
    team: '5',
    recipientId: recipientId,
    sender: '',
    profileImageURL: 'https://i.postimg.cc/ncsxyP5d/Frame-2593.png',
    relationship: '지인',
    content: '',
    font: 'Noto Sans',
  };

  const [values, setValues] = useState(INITIAL_VALUES);
  const [isDisabled, setIsDisabled] = useState(true);

  const { data, fetcher } = useRequest({
    url: `1-5/recipients/${recipientId}/messages/`,
    method: 'post',
    data: values,
    skip: true,
  });

  const handleErrorChange = (disabled) => {
    setIsDisabled(disabled);
  };

  const handleValuesChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await fetcher();
    } catch (err) {
      console.error('error : ', err);
    }
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      return navigate(`/post/${recipientId}`);
    }
  }, [data]);

  return (
    <Container>
      <ContentsWrapper>
        <MessageForm
          handleValuesChange={handleValuesChange}
          sender={values.sender}
          content={values.content}
          handleErrorChange={handleErrorChange}
          recipientId={recipientId}
        />
        <SubmitButton
          title="생성하기"
          disabled={isDisabled}
          onClick={handleSubmit}
        />
      </ContentsWrapper>
    </Container>
  );
}

export default CreateMessagePage;

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  ${flexCenter};
  flex-direction: column;
  margin-top: 57px;

  ${({ theme }) => theme.tablet`
    margin-top: 49px;
  `};
`;

const ContentsWrapper = styled.div`
  max-width: 720px;
  ${flexCenter};
  flex-direction: column;
  margin: 0 24px;
  gap: 69px;
  box-sizing: border-box;

  ${({ theme }) => theme.tablet`
    margin-bottom: 106px;
  `};
`;

const SubmitButton = styled(MainPrimaryButton)`
  width: 100%;
  max-width: 720px;

  ${({ theme }) => theme.tablet`
    width: 94%;
    position: fixed;
    bottom: 24px;
  `};
`;
