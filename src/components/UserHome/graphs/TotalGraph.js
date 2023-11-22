import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ReferenceLine,
  Legend,
} from 'recharts';
import { ChartApi } from '../../../Apis/CustomApis';

function TotalGraph(props) {
  const info = { date: props.date, option: 0 };

  let sum = [];
  const [data, setData] = useState([
    { name: '06:00', 금액: 0 },
    { name: '07:00', 금액: 0 },
    { name: '08:00', 금액: 0 },
    { name: '09:00', 금액: 0 },
    { name: '10:00', 금액: 0 },
    { name: '11:00', 금액: 0 },
    { name: '12:00', 금액: 0 },
    { name: '13:00', 금액: 0 },
    { name: '14:00', 금액: 0 },
    { name: '15:00', 금액: 0 },
    { name: '16:00', 금액: 0 },
    { name: '17:00', 금액: 0 },
    { name: '18:00', 금액: 0 },
    { name: '19:00', 금액: 0 },
    { name: '20:00', 금액: 0 },
    { name: '21:00', 금액: 0 },
    { name: '22:00', 금액: 0 },
  ]);
  useEffect(() => {
    let profit = 0;
    let cost = 0;

    if (info.date) {
      ChartApi(info)
        .then((res) => {
          if (res.data.costs != '' || res.data.profits != '') {
            res.data.profits.map((e, i) => {
              profit += e.money;
              cost -= res.data.costs[i].money;
              sum[i] = e.money - res.data.costs[i].money;
            });
          } else {
            data.map((e, i) => {
              sum[i] = 0;
            });
          }
          props.setTotalCost(cost);
          props.setTotalProfit(profit);
          sum.map((e, i) => {
            data[i].금액 = e;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [info.date]);

  return (
    <BarChart width={350} height={250} data={data}>
      <ReferenceLine y={0} stroke="black" />
      <XAxis dataKey="name" />
      <YAxis domain={[-1000, 1000]} />
      <Tooltip />
      <Legend
        wrapperStyle={{
          marginBottom: '260px',
          paddingRight: '130px',
          fontColor: '#fff',
          fontSize: '10px',
        }}
      />
      <Bar dataKey="금액" name="원" fill="#799094">
        {data.map((entry, index) => {
          return <Cell key={`cell-${index}`} fill="#799094" />;
        })}
      </Bar>
    </BarChart>
  );
}

export default TotalGraph;
