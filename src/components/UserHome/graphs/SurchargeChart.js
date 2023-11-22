import { ChartContainer } from './Chart';
import { ChartApi } from '../../../Apis/CustomApis';
import { useEffect, useState } from 'react';
import { TotalAmount, Graph, TotalAmountText } from './Chart';

import SurchargeGrapth from './SurchargetGraph';

function SurchargeChart(props) {
  const [totalCost, setTotalCost] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const info = { date: props.date, option: 1 };

  useEffect(() => {
    console.log(info);
    if (info.date) {
      ChartApi(info)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [info.date]);
  return (
    <ChartContainer>
      <div style={{ paddingTop: '20px', width: '340px', margin: '0 auto' }}>
        <TotalAmount>
          <TotalAmountText>지출</TotalAmountText>- {totalCost.toLocaleString()}
          원
        </TotalAmount>
      </div>
      <Graph>
        <SurchargeGrapth
          date={props.date}
          setTotalCost={setTotalCost}
          setTotalProfit={setTotalProfit}
          option="1"
        ></SurchargeGrapth>
      </Graph>
    </ChartContainer>
  );
}

export default SurchargeChart;
