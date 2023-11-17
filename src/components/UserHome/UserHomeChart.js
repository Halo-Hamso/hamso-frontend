import { useState } from 'react';
import Chart from './graphs/Chart';
import ChartDate from './chartNav/ChartDate';
import ChartMenu from './chartNav/ChartMenu';
import SurchargeChart from './graphs/SurchargeChart';
import ExpenditureChart from './graphs/ExpenditureChart';

function UserHomeChart() {
  const [chart, setChart] = useState('all');
  console.log(chart);
  return (
    <div>
      <ChartDate />
      <ChartMenu setChart={setChart} />

      {chart == 'all' ? (
        <Chart />
      ) : chart === 'surcharge' ? (
        <SurchargeChart />
      ) : (
        <ExpenditureChart />
      )}
    </div>
  );
}

export default UserHomeChart;
