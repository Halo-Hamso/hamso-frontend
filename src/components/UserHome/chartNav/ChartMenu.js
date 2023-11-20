import { useState } from 'react';
import styled from 'styled-components';

function ChartMenu(prop) {
  const [active, setActive] = useState('all');

  const handleChart = (e) => {
    setActive(e.target.name);
    prop.setChart(e.target.name);
  };
  return (
    <ChartMenuWrap>
      <ChartMenuBtn
        name="all"
        style={
          active === 'all'
            ? {
                background: '#ececec',
                border: '1px solid #799094',
                borderBottom: '0',
              }
            : {}
        }
        onClick={handleChart}
      >
        전체
      </ChartMenuBtn>
      <ChartMenuBtn
        name="surcharge"
        style={
          active === 'surcharge'
            ? {
                background: '#ececec',
                border: '1px solid #799094',
                borderBottom: '0',
              }
            : {}
        }
        onClick={handleChart}
      >
        부의금
      </ChartMenuBtn>
      <ChartMenuBtn
        name="expenditure"
        style={
          active === 'expenditure'
            ? {
                background: '#ececec',
                border: '1px solid #799094',
                borderBottom: '0',
              }
            : {}
        }
        onClick={handleChart}
      >
        지출
      </ChartMenuBtn>
    </ChartMenuWrap>
  );
}
const ChartMenuWrap = styled.div`
  display: flex;
  justify-content: space-around;
`;
const ChartMenuBtn = styled.button`
  height: 35px;
  border: 0;
  flex-grow: 1;
  background-color: #ffffff;
  font-family: NanumMyeongjo;
  font-size: 12px;
  font-weight: 800;
  border-bottom: 1px solid #799094;

  &:focus {
    background-color: #ececec;
    border: 1px solid #799094;
    border-bottom: 0;
  }
`;

export default ChartMenu;
