import { useEffect } from 'react';
import { ChartContainer } from './Chart';
import { ChartApi } from '../../../Apis/CustomApis';

function SurchargeChart(props) {
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
  return <ChartContainer></ChartContainer>;
}

export default SurchargeChart;
