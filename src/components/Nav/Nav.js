import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReactComponent as LogoIcon } from 'assets/icons/logo-icon.svg';
import { ZINDEX_NAV } from 'styles/zIndex';

function Nav() {
  const location = useLocation();
  const getNav = location.pathname === '/' || location.pathname === '/list';

  return (
    <NavLayout>
      <div className="nav-container">
        <Link to="/" className="logo">
          <LogoIcon />
          <p>Rolling</p>
        </Link>
        {getNav && (
          <Link to="/Post">
            <button className="gnb-button">롤링페이퍼 만들기</button>
          </Link>
        )}
      </div>
    </NavLayout>
  );
}

export default Nav;

const NavLayout = styled.nav`
  position: sticky;
  top: 0px;
  background-color: ${({ theme }) => theme[`white`]};
  border-bottom: 1px solid ${({ theme }) => theme[`--gray-300`]};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${ZINDEX_NAV};

  .nav-container {
    padding: 11px 24px;
    height: 62px;
    width: 1248px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  & .logo {
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 8px;

    & p {
      color: #4a494f;
      text-align: center;
      font-size: 20px;
      font-weight: 700;
      line-height: normal;
    }
  }
  & .gnb-button {
    display: inline-flex;
    padding: 14px 16px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    height: 40px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme[`--gray-500`]};
  }
`;
