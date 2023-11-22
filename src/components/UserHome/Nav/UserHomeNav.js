import styled from 'styled-components';
import hamsoLogo from '../../../images/hamso_logo.svg';
import logOut from '../../../images/logOut.svg';
import myPage from '../../../images/myPage.svg';
import MenuBtn from './MenuBtn';
import home from '../../../images/userMainHome.svg';
import account from '../../../images/userMainAccount.svg';
import payment from '../../../images/userMainPayment.svg';
import secretary from '../../../images/userMainSecretary.svg';
import { Link } from 'react-router-dom';
function UserHomeNav() {
  const log_out = () => {
    sessionStorage.clear();
    window.location.href = '/';
  };
  const userData = JSON.parse(sessionStorage.getItem('userData'));

  console.log(userData);

  return (
    <div>
      <HamsoHeaderWrap>
        <Link to="/userhome/home">
          <Logo src={hamsoLogo}></Logo>
        </Link>
        <HeaderTitleBox>
          <Link to="/userhome/home" style={{ textDecoration: 'none' }}>
            <HeaderTitle>함소</HeaderTitle>
            <HeaderSemiTitle>온전히 떠나보낼 수 있도록</HeaderSemiTitle>
          </Link>
        </HeaderTitleBox>
        <div style={{ marginRight: '10px' }}>
          {sessionStorage.getItem('userData') === '' ? (
            <HeaderText>
              로그아웃
              <img
                src={logOut}
                onClick={log_out}
                style={{ marginLeft: '4px' }}
              ></img>{' '}
              <HeaderText style={{ marginTop: '3px' }}>
                <img src={myPage}></img>
                {userData.name}
              </HeaderText>
              <HeaderText>
                {userData.phoneNo.slice(0, 3)}-{userData.phoneNo.slice(3, 7)}-
                {userData.phoneNo.slice(7, 11)}
              </HeaderText>
            </HeaderText>
          ) : (
            <Link to="/" style={{ textDecoration: 'none' }}>
              <HeaderText style={{ fontSize: '12px' }}>로그인</HeaderText>
            </Link>
          )}
        </div>
      </HamsoHeaderWrap>
      <MenuWrap>
        <MenuBtn imgName={home} path="home" text="홈" />
        <Link to="/home_account_table" style={{ textDecoration: 'none' }}>
          <MenuBtn imgName={account} path="account" text="부의금 가계부" />
        </Link>
        <MenuBtn imgName={payment} path="payment" text="실시간 지출 장부" />
        <MenuBtn imgName={secretary} path="helper" text="장례식 비서" />
      </MenuWrap>
    </div>
  );
}

export default UserHomeNav;

const HamsoHeaderWrap = styled.div`
  height: 56px;
  top: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderTitleBox = styled.div`
  width: 114px;
`;
const HeaderTitle = styled.div`
  font-family: NanumMyeongjo;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: 0.12em;
  display: flex;
  color: #493b39;
  justify-content: center;
`;
const HeaderSemiTitle = styled.div`
  font-family: NanumMyeongjo;
  font-size: 10px;
  font-weight: 700;
  text-align: left;
  color: #999999;
`;
const HeaderText = styled.div`
  font-family: NanumMyeongjo;
  font-size: 8px;
  font-weight: 400;
  display: flex;
  justify-content: end;
  text-align: left;
  color: #493b39;
`;
const Logo = styled.img`
  width: 72px;
  height: 52px;

  border-radius: 12.5px, 12.5px, 0px, 0px;
`;
const MenuWrap = styled.div`
  display: flex;
  height: 56px;
  align-items: center;
  justify-content: space-around;
`;
