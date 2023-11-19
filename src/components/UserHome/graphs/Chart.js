import styled from 'styled-components';
import TotalGraph from './TotalGraph';
import styledEngine from '@mui/styled-engine';

function Chart(props) {
  return (
    <ChartContainer>
      <div style={{ paddingTop: '20px', width: '340px', margin: '0 auto' }}>
        <TotalAmount>
          <TotalAmountText>잔액</TotalAmountText>
          12,760,000원
        </TotalAmount>
        <AmountBox style={{ marginTop: '20px' }}>
          <Amount>+ 23,900,000원</Amount>
          <AmountType>부의 금액</AmountType>
        </AmountBox>
        <AmountBox>
          <Amount>- 11,140,000원</Amount>
          <AmountType>지출액</AmountType>
        </AmountBox>
      </div>
      <Graph>
        <TotalGraph date={props.date} />
      </Graph>
    </ChartContainer>
  );
}

export default Chart;

const TotalAmount = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 340px;
  height: 40px;
  border-radius: 8px;
  background: #493b39;

  font-family: NanumMyeongjo;
  font-size: 24px;
  font-weight: 800;
  text-align: left;
  color: #ffffff;
`;
const TotalAmountText = styled.div`
  width: 60px;
  height: 24px;
  border: 1px solid #998f8c;
  border-radius: 16px;

  font-family: NanumMyeongjo;
  font-size: 10px;
  font-weight: 400;

  background-color: #fff;
  color: #493b39;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ChartContainer = styled.div`
  background-color: #ececec;
  height: 100vh;
  width: 100vw;
`;
const AmountBox = styled.div`
  display: flex;
  align-content: center;
  padding-left: 30px;
`;
const Amount = styled.div`
  font-family: NanumMyeongjo;
  font-size: 24px;
  font-weight: 800;
  text-align: left;
`;

const AmountType = styled.div`
  margin-left: 10px;
  display: flex;
  width: 60px;
  height: 24px;
  border-radius: 16px;
  background-color: #d9d9d9;
  font-family: NanumMyeongjo;
  font-size: 10px;
  font-weight: 400;

  align-items: center;
  justify-content: center;
`;
const Graph = styled.div`
  width: 370px;
  margin: 0 auto;
  margin-top: 50px;
`;
