import styled from 'styled-components';
import theme from '../../styles/theme';
import ColorCase from './ColorCase';
import ImageCase from './ImageCase';
import { SecondaryButton } from '../button/Button';
import PropTypes from 'prop-types';

function PostForm({
  currentTab,
  name,
  handleTabChange,
  handleValuesChange,
  isInputError,
  handleInputErrorChange,
}) {
  const handleBackgroundChange = (name, value) => {
    handleValuesChange(name, value);
  };

  const TAB_DATAS = [
    {
      key: 0,
      title: (
        <TabButton
          data-key="0"
          className={currentTab === 0 ? 'active' : 'inactive'}
          onClick={(e) => {
            handleTabChange(e, 0);
          }}
          title="컬러"
        />
      ),
      content: <ColorCase handleBackgroundChange={handleBackgroundChange} />,
    },
    {
      key: 1,
      title: (
        <TabButton
          data-key="1"
          className={currentTab === 1 ? 'active' : 'inactive'}
          onClick={(e) => {
            handleTabChange(e, 1);
          }}
          title="이미지"
        />
      ),
      content: <ImageCase handleBackgroundChange={handleBackgroundChange} />,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleValuesChange(name, value);
  };

  const validateName = () => {
    if (!name) {
      handleInputErrorChange(true);
      return;
    }
    handleInputErrorChange(false);
  };

  return (
    <Form>
      <FormItem>
        <Label htmlFor="receiverName">To.</Label>
        <InputText
          id="receiverName"
          type="text"
          placeholder="받는 사람 이름을 입력해 주세요"
          value={name}
          name="name"
          onChange={handleInputChange}
          onBlur={validateName}
          className={isInputError ? 'error' : ''}
        />
        {isInputError && <ErrorMessage>값을 입력해 주세요.</ErrorMessage>}
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
  );
}
PostForm.propTypes = {
  currentTab: PropTypes.number,
  handleTabChange: PropTypes.func,
  name: PropTypes.string,
  handleValuesChange: PropTypes.func,
  isInputError: PropTypes.bool,
  handleInputErrorChange: PropTypes.func,
};

export default PostForm;

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

  &:focus {
    outline: none;
    border: 2px solid ${theme['--gray-500']};
  }

  &.error {
    border: 1px solid ${theme['error']};
  }
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

const TabButton = styled(SecondaryButton)`
  &.inactive {
    background-color: ${theme['--gray-100']};
    border: none;
    color: ${theme['--gray-900']};

    &:hover {
      background-color: ${theme['white']};
      border: 1px solid ${theme['--purple-700']};
      color: ${theme['--purple-700']};
    }
  }
`;

const ErrorMessage = styled.span`
  margin-top: 4px;
  color: ${theme['error']};
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.06px;
`;
