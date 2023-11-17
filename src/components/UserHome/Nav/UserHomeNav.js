import styled from 'styled-components';
import hamsoLogo from '../../../images/hamso_logo.svg';
import logOut from '../../../images/logOut.svg';
import myPage from '../../../images/myPage.svg';
import MenuBtn from './MenuBtn';
import home from '../../../images/userMainHome.svg';
import account from '../../../images/userMainAccount.svg';
import payment from '../../../images/userMainPayment.svg';
import secretary from '../../../images/userMainSecretary.svg';
function UserHomeNav() {
  return (
    <div>
      <HamsoHeaderWrap>
        <Logo src={hamsoLogo}></Logo>
        <HeaderTitleBox>
          <HeaderTitle>함소</HeaderTitle>
          <HeaderSemiTitle>온전히 떠나보낼 수 있도록</HeaderSemiTitle>
        </HeaderTitleBox>
        <div style={{ marginRight: '10px' }}>
          <HeaderText>
            로그아웃 <img src={logOut}></img>
          </HeaderText>
          <HeaderText>
            <img src={myPage}></img>김함소님
          </HeaderText>
          <HeaderText>010-3394-3953</HeaderText>
        </div>
      </HamsoHeaderWrap>
      <MenuWrap>
        <MenuBtn imgName={home} text="홈" />
        <MenuBtn imgName={account} text="부의금 가계부" />
        <MenuBtn imgName={payment} text="실시간 지출 장부" />
        <MenuBtn imgName={secretary} text="장례식 비서" />
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
