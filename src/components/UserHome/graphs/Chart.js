import styled from 'styled-components';
import TotalGraph from './TotalGraph';
import { useEffect, useState } from 'react';

function Chart(props) {
  const [totalCost, setTotalCost] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  useEffect(() => {
    setTotalCost(0);
    setTotalProfit(0);
  }, []);
  return (
    <ChartContainer>
      <div style={{ paddingTop: '20px', width: '340px', margin: '0 auto' }}>
        <TotalAmount>
          <TotalAmountText>총 금액</TotalAmountText>
          {(totalCost + totalProfit).toLocaleString()}원
        </TotalAmount>
        <TotalAmount style={{ marginTop: '10px' }}>
          <TotalAmountText>잔액</TotalAmountText>
          {(totalCost + totalProfit).toLocaleString()}원
        </TotalAmount>
        <AmountBox style={{ marginTop: '20px' }}>
          <Amount>+{totalProfit.toLocaleString()}원</Amount>
          <AmountType>부의 금액</AmountType>
        </AmountBox>
        <AmountBox>
          <Amount>
            {totalCost == 0 ? '-' : ''}
            {totalCost.toLocaleString()}원
          </Amount>
          <AmountType>지출액</AmountType>
        </AmountBox>
      </div>
      <Graph>
        <TotalGraph
          date={props.date}
          setTotalCost={setTotalCost}
          setTotalProfit={setTotalProfit}
        />
      </Graph>
    </ChartContainer>
  );
}

export default Chart;

export const TotalAmount = styled.div`
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
export const TotalAmountText = styled.div`
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
  height: 60vh;
  width: 100vw;
`;
const AmountBox = styled.div`
  display: flex;
  align-items: center;
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

  width: 56px;
  height: 20px;
  border: 1px solid #799094;
  border-radius: 16px;

  font-family: NanumMyeongjo;
  font-size: 8px;
  font-weight: 400;
  color: #475a5d;
  align-items: center;
  justify-content: center;
`;
export const Graph = styled.div`
  width: 370px;
  margin: 0 auto;
  margin-top: 50px;
`;
