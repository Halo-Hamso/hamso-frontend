import styled from 'styled-components';
import downArrow from '../../images/downArrow.svg';
function PaymentNav() {
  return (
    <div>
      <PaymentType>
        용품별 결제 내역 <img src={downArrow}></img>
      </PaymentType>
      <PaymentCategory>
        <Box>사용 시간</Box>
        <Box> 장례용품</Box>
        <Box>개수</Box>
        <Box>비용</Box>
      </PaymentCategory>
      <Line></Line>
    </div>
  );
}

export default PaymentNav;

const PaymentType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  width: 170px;
  height: 24px;
  border-radius: 15px;
  border: 1px solid #799094;

  font-family: NanumMyeongjo;
  font-size: 12px;
  font-weight: 700;
`;

export const PaymentCategory = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  font-family: NanumMyeongjo;
  font-size: 12px;
  font-weight: 800;
  color: #333333;
`;

export const Box = styled.div`
  width: 50px;
`;

const Line = styled.div`
  border: 1px solid #ececec;
  margin: 0 auto;
  margin-top: 10px;
  width: 90vw;
`;
