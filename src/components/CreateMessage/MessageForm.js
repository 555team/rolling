import styled from 'styled-components';
import theme from 'styles/theme';
import Textarea from 'components/textarea/Textarea';
import Select from 'react-select';
import useRequest from '../../hooks/useRequest';
import { useEffect, useState } from 'react';
import BasicProfile from 'assets/img/basic_profile_img.svg';

function MessageForm({
  sender,
  handleValuesChange,
  content,
  handleErrorChange,
}) {
  const [profileImages, setProfileImages] = useState();
  const [selectedProfile, setSelectedProfile] = useState(BasicProfile);
  const [isSenderError, setIsSenderError] = useState(false);
  const [isContentError, setIsContentError] = useState(false);
  const [isSenderErrorTemp, setIsSenderErrorTemp] = useState(true);
  const [isContentErrorTemp, setIsContentErrorTemp] = useState(true);

  const extractText = (html) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const { data } = useRequest({
    url: `profile-images/`,
    method: 'get',
    skip: false,
  });

  useEffect(() => {
    if (data && data.imageUrls && data.imageUrls.length > 0) {
      setProfileImages(data?.imageUrls);
    }
  }, [data]);

  // react-select 라이브러리를 위한 style객체
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
    validateName(value);
  };

  const handleTextareaValue = (value) => {
    validateContent(value);
    handleValuesChange('content', value);
  };

  const handleProfileChange = (e) => {
    const { name, src } = e.target;
    setSelectedProfile(e.target.src);
    handleValuesChange(name, src);
  };

  const handleRelationshipChange = (e) => {
    handleValuesChange('relationship', e.value);
  };

  const handleFontChange = (e) => {
    handleValuesChange('font', e.value);
  };

  const isSubmitDisabled = () => {
    let disabled = true;
    if (!isSenderErrorTemp && !isContentErrorTemp) {
      disabled = false;
    }
    return disabled;
  };

  const validateName = (text) => {
    if (text.length === 0) {
      setIsSenderError(true);
      setIsSenderErrorTemp(true);
    } else {
      setIsSenderError(false);
      setIsSenderErrorTemp(false);
    }
  };

  const validateContent = (text) => {
    if (extractText(text).length === 0) {
      setIsContentError(true);
      setIsContentErrorTemp(true);
    } else {
      setIsContentError(false);
      setIsContentErrorTemp(false);
    }
  };

  useEffect(() => {
    handleErrorChange(isSubmitDisabled());
  }, [isContentError, isSenderError, isSenderErrorTemp, isContentErrorTemp]);

  return (
    <Form>
      <FormItem>
        <Label htmlFor="sender">From.</Label>
        <InputText
          id="sender"
          type="text"
          placeholder="이름을 이름을 입력해 주세요"
          value={sender}
          name="sender"
          onInput={handleInputChange}
          onBlur={handleInputChange}
          className={isSenderError ? 'error' : ''}
        />
        {isSenderError && <ErrorMessage>값을 입력해 주세요.</ErrorMessage>}
      </FormItem>
      <FormItem>
        <Label>프로필 이미지</Label>
        <ProfileContainer>
          <ProfileImage
            src={selectedProfile}
            className="selectedProfile"
            alt="선택된 프로필 이미지"
          />
          <ProfileWrapper>
            <Description>프로필 이미지를 선택해주세요!</Description>
            <ProfileImageWrapper>
              {profileImages
                ? profileImages.map((data, index) => (
                    <ProfileImage
                      name="profileImageURL"
                      onClick={handleProfileChange}
                      key={index}
                      src={data}
                      alt="프로필 이미지"
                    />
                  ))
                : '데이터가 없습니다.'}
            </ProfileImageWrapper>
          </ProfileWrapper>
        </ProfileContainer>
      </FormItem>
      <FormItem>
        <Label>상대와의 관계</Label>
        <Select
          options={RELATIONSHIP_OPTIONS}
          styles={selectStyles}
          isSearchable={false}
          components={{
            IndicatorSeparator: () => null,
          }}
          name="relationship"
          onChange={handleRelationshipChange}
          defaultValue={RELATIONSHIP_OPTIONS[0]}
        />
      </FormItem>
      <FormItem>
        <Label>내용을 입력해 주세요</Label>
        <Textarea
          value={content}
          name="content"
          handleValue={handleTextareaValue}
          validate={validateContent}
          className={isContentError ? 'error' : ''}
        />
        {isContentError && <ErrorMessage>값을 입력해 주세요.</ErrorMessage>}
      </FormItem>
      <FormItem>
        <Label>폰트 선택</Label>
        <Select
          name="font"
          onChange={handleFontChange}
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
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
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

const Description = styled.span`
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

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ProfileImage = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 100px;
  border: 1px solid ${theme['--gray-200']};
  object-fit: cover;

  &.selectedProfile {
    width: 80px;
    height: 80px;
  }
`;

const ProfileImageWrapper = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;

  ${ProfileImage} {
    cursor: pointer;

    &:hover {
      filter: opacity(50%);
    }
  }
`;
