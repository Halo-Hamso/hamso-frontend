import { useEffect, useState } from 'react';
import {
  ComposedChart,
  Bar,
  XAxis,
  Cell,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
} from 'recharts';
import { ChartApi } from '../../../Apis/CustomApis';
function SurchargeGrapth(props) {
  const info = { date: props.date, option: 2 };
  let profit = [];
  let sum = 0;
  const [data, setData] = useState([
    { name: '08:00', 금액: 300 },
    { name: '09:00', 금액: 6000 },
    { name: '10:00', 금액: 300 },
    { name: '11:00', 금액: 300 },
    { name: '12:00', 금액: 300 },
    { name: '13:00', 금액: 100 },
    { name: '14:00', 금액: 200 },
    { name: '15:00', 금액: 100 },
    { name: '16:00', 금액: 200 },
    { name: '17:00', 금액: 400 },
    { name: '18:00', 금액: 500 },
    { name: '19:00', 금액: 800 },
    { name: '20:00', 금액: 200 },
    { name: '21:00', 금액: 100 },
    { name: '22:00', 금액: 400 },
    { name: '23:00', 금액: 500 },
    { name: '24:00', 금액: 900 },
  ]);
  useEffect(() => {
    let sum = 0;
    if (info.date) {
      ChartApi(info)
        .then((res) => {
          console.log(res);
          let newData = data.map((item, i) => {
            // profits 배열의 길이가 data 배열의 길이보다 작을 수 있으므로 체크합니다.
            if (i < res.data.costs.length) {
              let profit = res.data.costs[i];
              sum += profit.money;
              // 새로운 객체를 반환하여 불변성을 유지합니다.
              return { ...item, 금액: profit.money };
            } else {
              // profits 배열에 해당 인덱스가 없으면 원래 item을 그대로 반환합니다.
              return item;
            }
          });
          props.setTotalProfit(sum);
          newData = accumulate(newData);
          setData(newData); // setData를 사용하여 상태를 업데이트합니다.
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [info.date]); // 의존성 배열에 info.date를 추가합니다.

  const accumulate = (data) => {
    let total = 0;
    let newData = data.map((item) => {
      total += item.금액;
      // 새로운 객체를 반환하여 불변성을 유지합니다.
      return { ...item, 누적금액: total };
    });
    return newData; // 수정된 데이터를 반환합니다.
  };
  return (
    <div>
      <ComposedChart
        width={350}
        height={400}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="금액" barSize={20} fill="#799094"></Bar>
        <Line type="monotone" dataKey="누적금액" stroke="#493B39" />
      </ComposedChart>
    </div>
  );
}

export default SurchargeGrapth;
