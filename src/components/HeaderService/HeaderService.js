// import { Emoji } from 'emoji-picker-react';
import styled from 'styled-components';
import Emoji from 'components/Emoji/Emoji';

function HeaderService() {
  //const location = useLocation();
  // /post/{id}
  //const getNav = location.pathname.startsWith('/post/');

  return (
    <HeaderServiceLayout>
      <div className="header-service-container">
        {
          <>
            <div className="to">To. Ashley Kim</div>
            <div>
              <Emoji />
            </div>
          </>
        }
      </div>
    </HeaderServiceLayout>
  );
}

export default HeaderService;

const HeaderServiceLayout = styled.nav`
  position: fixed;
  top: 62;
  width: 100%;
  background-color: ${({ theme }) => theme[`white`]};
  border-bottom: 1px solid ${({ theme }) => theme[`--gray-300`]};
  display: flex;
  justify-content: center;
  align-items: center;

  .header-service-container {
    padding: 11px 24px;
    height: 62px;
    width: 1248px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .to {
    width: 227px;
    font-size: 28px;
    font-style: normal;
    font-weight: 700;
    line-height: 42px;
    letter-spacing: -0.28px;
  }
`;
