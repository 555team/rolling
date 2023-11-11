import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import theme from 'styles/theme';
import { MainPrimaryButton } from 'components/button/Button';
import { Link } from 'react-router-dom';
import LANDING_DATA from 'constants/landingData';

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
  return (
    <Container>
      <ContentsWrapper>
        {LANDING_DATA.map((data) => (
          <Section key={data.key} data={data} />
        ))}
        <LinkComponent to="/list">
          <LinkButton title="구경해보기"></LinkButton>
        </LinkComponent>
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
  margin-top: 60px;
  ${flexCenter};
  flex-direction: column;

  // Tablet
  @media (min-width: 768px) and (max-width: 1199px) {
    margin-top: 49px;
  }

  // Mobile
  @media (max-width: 767px) {
    margin-top: 42px;
  }
`;

const ContentsWrapper = styled.div`
  max-width: 1248px;
  ${flexCenter};
  flex-direction: column;
  gap: 30px;
  margin: 0 24px;

  // Tablet And Mobile
  @media (max-width: 1199px) {
    margin-bottom: 86px;
  }

  // Mobile
  @media (max-width: 767px) {
    gap: 24px;
  }
`;

const responsiveSectionWrapper = css`
  // Tablet And Mobile
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
    ${responsiveSectionWrapper};
  }

  &:nth-of-type(even) {
    grid-template: 'image text';
    grid-template-columns: 3fr 2fr;
    padding-left: 0;
    gap: 0;
    ${responsiveSectionWrapper};
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

const LinkComponent = styled(Link)`
  width: 100%;
  ${flexCenter};
`;

const LinkButton = styled(MainPrimaryButton)`
  // Tablet And Mobile
  @media (max-width: 1199px) {
    position: fixed;
    bottom: 24px;
    width: 94%;
    max-width: 800px;
  }
`;
