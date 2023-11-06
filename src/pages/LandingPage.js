import landingImg1 from 'assets/img/landing_img_01.png';
import landingImg2 from 'assets/img/landing_img_02.png';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import theme from '../styles/theme';

function Section({ data }) {
  return (
    <SectionWrapper>
      <TextWrapper>
        <Header>{data.header}</Header>
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
      </TextWrapper>
      <ImageWrapper>
        <Image src={data.imgSource} alt={data.imgAlt} />
      </ImageWrapper>
    </SectionWrapper>
  );
}
Section.propTypes = {
  data: PropTypes.object,
};

function LandingPage() {
  const datas = [
    {
      key: 1,
      header: 'Point. 01',
      title: '누구나 손쉽게, 온라인\n 롤링 페이퍼를 만들 수 있어요',
      description: '로그인 없이 자유롭게 만들어요.',
      imgSource: landingImg1,
      imgAlt: '롤링페이퍼를 추가하는 이미지',
    },
    {
      key: 2,
      header: 'Point. 02',
      title: '서로에게 이모지로 감정을\n 표현해보세요',
      description: '롤링 페이퍼에 이모지를 추가할 수 있어요.',
      imgSource: landingImg2,
      imgAlt: '이모지로 감정 표현을 하는 이미지',
    },
  ];

  return (
    <Container>
      <ContentsWrapper>
        {datas.map((data) => (
          <Section key={data.key} data={data} />
        ))}
        <button type="button">구경해보기</button>
      </ContentsWrapper>
    </Container>
  );
}

export default LandingPage;

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
  max-width: 1248px;
  ${flexCenter};
  flex-direction: column;
  gap: 30px;
  margin: 0 24px;

  // Mobile
  @media (max-width: 767px) {
    gap: 24px;
  }
`;

const sectionWrapper = css`
  // Tablet
  @media (max-width: 1199px) {
    display: flex;
    flex-direction: column;
    gap: 0;
    padding: 40px;
  }

  // Mobile
  @media (max-width: 767px) {
    padding: 0;
    gap: 20px;
  }
`;

const SectionWrapper = styled.section`
  display: grid;
  background-color: ${theme.surface};
  border-radius: 16px;
  padding: 60px;
  width: 100%;

  &:nth-of-type(odd) {
    grid-template: 'text image';
    grid-template-columns: 2fr 3fr;
    padding-right: 0;
    gap: 152px;
    ${sectionWrapper};
  }

  &:nth-of-type(even) {
    grid-template: 'image text';
    grid-template-columns: 3fr 2fr;
    padding-left: 0;
    gap: 0;
    ${sectionWrapper};
  }
`;

const Header = styled.span`
  border-radius: 50px;
  background: ${theme['--purple-600']};
  display: inline-block;
  padding: 6px 12px;
  max-width: 80px;

  // font
  color: ${theme.white};
  font-weight: 700;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.07px;

  // Mobile
  @media (max-width: 767px) {
    padding: 4px 12px;
  }
`;

const Title = styled.span`
  color: ${theme['--gray-900']};
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.24px;
  padding-top: 8px;

  // Mobile
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.18px;
  }
`;

const Description = styled.span`
  color: ${theme['--gray-500']};
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.18px;

  // Mobile
  @media (max-width: 767px) {
    font-size: 15px;
    line-height: 22px;
    letter-spacing: -0.15px;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin: 0 auto;

  // Mobile
  @media (max-width: 767px) {
    max-width: none;
    width: 120%;
    position: relative;
    right: 10%;
  }
`;

const ImageWrapper = styled.div`
  grid-area: image;

  // Tablet
  @media (max-width: 1199px) {
    padding-top: 20px;
  }

  // Mobile
  @media (max-width: 767px) {
    padding-bottom: 30px;
    overflow: hidden;
  }
`;

const TextWrapper = styled.div`
  grid-area: text;
  display: flex;
  flex-direction: column;
  gap: 8px;
  white-space: pre-line;

  // Mobile
  @media (max-width: 767px) {
    padding: 24px 24px 0 24px;
  }
`;
