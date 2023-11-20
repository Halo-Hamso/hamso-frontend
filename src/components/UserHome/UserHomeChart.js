import { useState } from 'react';
import Chart from './graphs/Chart';
import ChartDate from './chartNav/ChartDate';
import ChartMenu from './chartNav/ChartMenu';
import SurchargeChart from './graphs/SurchargeChart';
import ExpenditureChart from './graphs/ExpenditureChart';

function UserHomeChart() {
  const [chart, setChart] = useState('all');
  const [date, setDate] = useState('');

  return (
    <div>
      <ChartDate setDate={setDate} />
      <ChartMenu setChart={setChart} />
      {chart == 'all' ? (
        <Chart date={date} />
      ) : chart === 'surcharge' ? (
        <ExpenditureChart date={date} />
      ) : (
        <SurchargeChart date={date} />
      )}
    </div>
  );
}

export default UserHomeChart;
