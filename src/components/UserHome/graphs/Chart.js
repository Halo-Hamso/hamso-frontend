import styled from 'styled-components';
import TotalGraph from './TotalGraph';

function Chart() {
  return (
    <ChartContainer>
      <div style={{ paddingLeft: '30px', paddingTop: '30px' }}>
        <AmountBox>
          <Amount>+ 23,900,000원</Amount>
          <AmountType>부의 금액</AmountType>
        </AmountBox>
        <AmountBox>
          <Amount>- 11,140,000원</Amount>
          <AmountType>지출액</AmountType>
        </AmountBox>
      </div>
      <Graph>
        <TotalGraph />
      </Graph>
    </ChartContainer>
  );
}

export default Chart;
export const ChartContainer = styled.div`
  background-color: #ececec;
  height: 100vh;
  width: 100vw;
`;
const AmountBox = styled.div`
  display: flex;
  align-content: center;
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
