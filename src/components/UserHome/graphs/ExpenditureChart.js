import { ChartContainer } from './Chart';
import { ChartApi } from '../../../Apis/CustomApis';
import { useEffect } from 'react';
function ExpenditureChart(props) {
  const info = { date: props.date, option: 2 };
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

export default ExpenditureChart;
