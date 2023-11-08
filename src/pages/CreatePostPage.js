import styled, { css } from 'styled-components';
import { MainPrimaryButton } from 'components/button/Button';
import { useState } from 'react';
import PostForm from '../components/createPost/PostForm';
import BackgroundImg1 from 'assets/img/sample_background_01.jpg';

function CreatePostPage() {
  const INITIAL_VALUES = {
    name: '',
    backgroundColor: 'beige',
    backgroundImageURL: { BackgroundImg1 },
  };

  // tab을 위한 state
  const [currentTab, setCurrentTab] = useState(0);
  // submit할 state
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleValuesChange = (name, value) => {
    setValues((preValues) => ({
      ...preValues,
      [name]: value,
    }));
  };

  const handleTabChange = (e, key) => {
    e.preventDefault();
    setCurrentTab(key);
  };

  return (
    <Container>
      <ContentsWrapper>
        <FormWrapper>
          <PostForm
            currentTab={currentTab}
            handleTabChange={handleTabChange}
            handleValuesChange={handleValuesChange}
            name={values.name}
          />
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
