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

function TotalGraph() {
  const data = [
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
  ];

  return (
    <BarChart width={350} height={250} data={data}>
      <ReferenceLine y={0} stroke="black" />
      <XAxis dataKey="name" />
      <YAxis domain={[-1000, 1000]} />
      <Tooltip />
      <Legend wrapperStyle={{ marginLeft: '40px' }} />
      <Bar dataKey="금액" name="금액(만원)">
        {data.map((entry, index) => {
          const color = entry.금액 < 0 ? '#0000ff' : '#D84315';
          return <Cell key={`cell-${index}`} fill={color} />;
        })}
      </Bar>
    </BarChart>
  );
}

export default TotalGraph;
