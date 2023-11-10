import styled from 'styled-components';
import theme from 'styles/theme';
import Textarea from 'components/textarea/Textarea';
import Select from 'react-select';

function MessageForm({
  sender,
  handleValuesChange,
  isInputError,
  handleInputErrorChange,
}) {
  const selectStyles = {
    control: (provided, state) => ({
      ...provided,
      maxWidth: '320px',
      borderRadius: '8px',
      backgroundColor: theme['white'],
      borderColor: theme['--gray-300'],
      outline: state.isFocused ? `2px solid ${theme['--gray-900']}` : '',
      '&:hover': {
        borderColor: 'none',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '26px',
      letterSpacing: '-0.16px',
      padding: '12px 16px',
    }),
    option: (provided, { isFocused, isSelected }) => ({
      ...provided,
      backgroundColor:
        isSelected || isFocused ? theme['--gray-100'] : theme['white'],
      color: theme['--gray-900'],
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '26px',
      letterSpacing: '-0.16px',
    }),
    menu: (provided) => ({
      ...provided,
      maxWidth: '320px',
      boxShadow: '0px 2px 12px 0px rgba(0, 0, 0, 0.08)',
      borderRadius: '8px',
      border: `1px solid ${theme['--gray-300']}`,
    }),
  };

  const RELATIONSHIP_OPTIONS = [
    { value: '지인', label: '지인' },
    { value: '친구', label: '친구' },
    { value: '동료', label: '동료' },
    { value: '가족', label: '가족' },
  ];

  const FONT_OPTIONS = [
    { value: 'Noto Sans', label: 'Noto Sans' },
    { value: 'Pretendard', label: 'Pretendard' },
    { value: '나눔명조', label: '나눔명조' },
    { value: '나눔손글씨 손편지체', label: '나눔손글씨 손편지체' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleValuesChange(name, value);
    validateName();
  };

  const validateName = () => {
    if (sender.length === 0) {
      handleInputErrorChange(true);
      return;
    }
    handleInputErrorChange(false);
  };

  return (
    <Form>
      <FormItem>
        <Label htmlFor="senderName">From.</Label>
        <InputText
          id="senderName"
          type="text"
          placeholder="이름을 이름을 입력해 주세요"
          value={sender}
          name="sender"
          onInput={handleInputChange}
          onBlur={validateName}
          className={isInputError ? 'error' : ''}
        />
        {isInputError && <ErrorMessage>값을 입력해 주세요.</ErrorMessage>}
      </FormItem>
      <TextWrapper>
        <DescriptionHeader>프로필 이미지</DescriptionHeader>
        <DescriptionContents>프로필 이미지를 선택해주세요!</DescriptionContents>
      </TextWrapper>
      <FormItem>
        <Label>상대와의 관계</Label>
        <Select
          options={RELATIONSHIP_OPTIONS}
          styles={selectStyles}
          isSearchable={false}
          components={{
            IndicatorSeparator: () => null,
          }}
          defaultValue={RELATIONSHIP_OPTIONS[0]}
        />
      </FormItem>
      <FormItem>
        <Label>내용을 입력해 주세요</Label>
        <Textarea />
      </FormItem>
      <FormItem>
        <Label>폰트 선택</Label>
        <Select
          options={FONT_OPTIONS}
          defaultValue={FONT_OPTIONS[0]}
          styles={selectStyles}
          isSearchable={false}
          components={{
            IndicatorSeparator: () => null,
          }}
        />
      </FormItem>
    </Form>
  );
}

export default MessageForm;

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

const ErrorMessage = styled.span`
  margin-top: 4px;
  color: ${theme['error']};
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: -0.06px;
`;
