import styled from 'styled-components';
import check from '../../images/paymentCheck.svg';
import x from '../../images/paymentX.svg';
function SelectPopup(props) {
  return (
    <PopupBackground>
      <PopupContainer>
        <div style={{ margin: '30px auto', width: '300px' }}>
          <PopupText>
            내역 선택
            <Left
              onClick={() => {
                props.setPopup(false);
              }}
              src={x}
            ></Left>
          </PopupText>
          <Line />
          <PopupText>
            실시간 결제 내역
            <Left src={check}></Left>
          </PopupText>
          <PopupText>
            용품별 결제 내역
            <Left src={check}></Left>
          </PopupText>
        </div>
      </PopupContainer>
    </PopupBackground>
  );
}
const Line = styled.div`
  margin-top: 10px;
  border: 1px solid #999999;
`;
const Left = styled.img`
  display: flex;
  margin-left: auto;
`;
const PopupContainer = styled.div`
  width: 350px;
  height: 152px;
  border-radius: 16px;
  margin: 0 auto;
  margin-bottom: 20px;
  justify-content: end;
  background-color: aliceblue;
`;
const PopupBackground = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background-color: #00000080;
  display: flex;
  justify-content: end;
  flex-direction: column;
`;
export default SelectPopup;

const PopupText = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  font-family: NanumMyeongjo;
  font-size: 16px;
  font-weight: 700;
`;
