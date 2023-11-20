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

  let profit = 0;
  let cost = 0;
  let sum = [];
  const [data, setData] = useState([
    { name: '06:00', 금액: -300 },
    { name: '07:00', 금액: -300 },
    { name: '08:00', 금액: -300 },
    { name: '09:00', 금액: -300 },
    { name: '10:00', 금액: -300 },
    { name: '11:00', 금액: -100 },
    { name: '12:00', 금액: 200 },
    { name: '13:00', 금액: 100 },
    { name: '14:00', 금액: -200 },
    { name: '15:00', 금액: 400 },
    { name: '16:00', 금액: 500 },
    { name: '17:00', 금액: 800 },
    { name: '18:00', 금액: 200 },
    { name: '19:00', 금액: -100 },
    { name: '20:00', 금액: -400 },
    { name: '21:00', 금액: 500 },
    { name: '22:00', 금액: 900 },
  ]);
  useEffect(() => {
    console.log(info);
    if (info.date) {
      ChartApi(info)
        .then((res) => {
          console.log(res);
          res.data.profits.map((e, i) => {
            profit += e.money;
            cost -= res.data.costs[i].money;
            sum[i] = e.money - res.data.costs[i].money;
          });
          props.setTotalCost(cost);
          props.setTotalProfit(profit);
          sum.map((e, i) => {
            data[i].금액 = e;
          });
          console.log(data);
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
      <Bar dataKey="금액" name="(단위)만원" fill="#799094">
        {data.map((entry, index) => {
          return <Cell key={`cell-${index}`} fill="#799094" />;
        })}
      </Bar>
    </BarChart>
  );
}

export default TotalGraph;
