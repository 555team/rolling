import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ErrorImg from 'assets/img/error-img.png';

function ErrorPage() {
  return (
    <ErrorPageLayout>
      <div>
        <Title>Oops!!</Title>
        <Content>
          This is not the page
          <br />
          you are looking for
        </Content>
        <Link to="/">
          <Button>Go Back Home</Button>
        </Link>
      </div>

      <ImgContainer>
        <img src={ErrorImg} alt="error message" />
      </ImgContainer>
    </ErrorPageLayout>
  );
}

export default ErrorPage;

const ErrorPageLayout = styled.div`
  padding: 130px; auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Title = styled.h1`
  font-size: 100px;
  padding: 0px 0px 20px 0px;
  color: ${({ theme }) => theme[`--gray-700`]};
`;

const Content = styled.div`
  font-size: 20px;
  padding: 25px 0px;
`;

const ImgContainer = styled.div`
  min-width: 200px;
  max-width: 300px;
  & img {
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 5px 10px;
  width: 200px;
  border: 2px solid ${({ theme }) => theme[`--purple-700`]};
  color: ${({ theme }) => theme[`--purple-700`]};
  border-radius: 15px;
`;
