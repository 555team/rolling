import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { MainPrimaryButton, SecondaryButton } from 'components/button/Button';
import { useState } from 'react';
import ColorCase from 'components/createPost/ColorCase';
import ImageCase from 'components/createPost/ImageCase';

function CreatePostPage() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (e, key) => {
    e.preventDefault();
    setCurrentTab(key);
  };

  const TAB_DATAS = [
    {
      key: 0,
      title: (
        <SecondaryButton
          data-key="0"
          className={currentTab === 0 ? 'active' : 'disabled'}
          onClick={(e) => {
            handleTabChange(e, 0);
          }}
          disabled={currentTab === 0}
          title="컬러"
        />
      ),
      content: <ColorCase />,
    },
    {
      key: 1,
      title: (
        <SecondaryButton
          data-key="1"
          className={currentTab === 1 ? 'active' : ''}
          onClick={(e) => {
            handleTabChange(e, 1);
          }}
          disabled={currentTab === 1}
          title="이미지"
        ></SecondaryButton>
      ),
      content: <ImageCase />,
    },
  ];

  return (
    <Container>
      <ContentsWrapper>
        <FormWrapper>
          <Form>
            <FormItem>
              <Label htmlFor="receiverName">To.</Label>
              <InputText
                id="receiverName"
                type="text"
                placeholder="받는 사람 이름을 입력해 주세요"
              />
            </FormItem>
            <TextWrapper>
              <DescriptionHeader>배경화면을 선택해 주세요.</DescriptionHeader>
              <DescriptionContents>
                컬러를 선택하거나, 이미지를 선택할 수 있습니다.
              </DescriptionContents>
            </TextWrapper>
            <div>
              {TAB_DATAS.map((data) => {
                return data.title;
              })}

              <div>{TAB_DATAS[currentTab].content}</div>
            </div>
          </Form>
        </FormWrapper>
        <SubmitButton title="생성하기" />
      </ContentsWrapper>
    </Container>
  );
}

export default CreatePostPage;

const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  ${flexCenter};
  flex-direction: column;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  max-width: 720px;
  ${flexCenter};
  flex-direction: column;
  margin: 0 24px;
  gap: 69px;

  // Tablet And Mobile
  @media (max-width: 1199px) {
    margin-bottom: 106px;
  }
`;

const FormWrapper = styled.div`
  margin: 0 24px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  color: ${theme['--gray-900']};
  font-size: 24px;
  font-weight: 700;
  line-height: 42px;
  letter-spacing: -0.24px;
`;

const InputText = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid ${theme['--gray-300']};
  border-radius: 8px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const DescriptionHeader = styled.span`
  color: ${theme['--gray-900']};
  margin-top: 25px;

  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.24px;
`;

const DescriptionContents = styled.span`
  color: ${theme['--gray-500']};
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: -0.16px;
`;

const SubmitButton = styled(MainPrimaryButton)`
  width: 100%;
  max-width: 720px;

  // Tablet And Mobile
  @media (max-width: 1199px) {
    width: 94%;
    position: fixed;
    bottom: 24px;
  }
`;
