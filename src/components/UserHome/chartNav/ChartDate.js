import styled from 'styled-components';
import leftArrow from '../../../images/leftArrow.svg';
import { useEffect, useState } from 'react';

function ChartDate(props) {
  const today = new Date();
  const dayOfWeek = ['월', '화', '수', '목', '금', '토', '일'];
  const bigMonth = [1, 3, 5, 7, 8, 10, 12];

  const [chartDate, setChartDate] = useState({
    // year: today.getFullYear(),
    // month: today.getMonth() + 1,
    // date: today.getDate(),
    // day: today.getDay(),
    year: 2023,
    month: 11,
    date: 15,
    day: 4,
  });

  useEffect(() => {
    props.setDate(`${chartDate.year}-${chartDate.month}-${chartDate.date}`);
  }, []);
  const handleLeftArrow = () => {
    let setDate = chartDate.date - 1;
    let setMonth = chartDate.month;
    let setYear = chartDate.year;
    let setDay = chartDate.day - 1;
    if (setDay === -1) {
      setDay = 6;
    }

    if (setDate == 0) {
      setMonth -= 1;
      if (setMonth == 0) {
        setYear -= 1;
        setMonth = 12;
      }
      if (bigMonth.includes(setMonth)) setDate = 31;
      else setDate = 30;
    }
    setChartDate({
      year: setYear,
      month: setMonth,
      date: setDate,
      day: setDay,
    });
    props.setDate(`${setYear}-${setMonth}-${setDate}`);
  };

  const handleRightArrow = () => {
    let setDate = chartDate.date + 1;
    let setMonth = chartDate.month;
    let setYear = chartDate.year;
    let setDay = chartDate.day + 1;
    let nextMonthDate = 1;
    if (bigMonth.includes(setMonth)) nextMonthDate = 32;
    else nextMonthDate = 31;
    if (setDay === 7) {
      setDay = 0;
    }

    if (setDate == nextMonthDate) {
      setMonth += 1;
      if (setMonth == 13) {
        setYear += 1;
        setMonth = 1;
      }
      setDate = 1;
    }
    setChartDate({
      year: setYear,
      month: setMonth,
      date: setDate,
      day: setDay,
    });
    props.setDate(`${setYear}-${setMonth}-${setDate}`);
  };
  return (
    <DateWrap>
      <Arrow src={leftArrow} onClick={handleLeftArrow}></Arrow>
      <DateBox>
        <DateText>{`${chartDate.year}년 ${chartDate.month}월 ${
          chartDate.date
        }일(${dayOfWeek[chartDate.day]})`}</DateText>
      </DateBox>
      <Arrow
        src={leftArrow}
        onClick={handleRightArrow}
        style={{ rotate: '180deg' }}
      ></Arrow>
    </DateWrap>
  );
}

export default ChartDate;
const DateWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 36px;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ececec;
  margin: 0px 20px;
  width: 200px;
  height: 24px;
  border-radius: 10px;
`;

const DateText = styled.div`
  font-family: NanumMyeongjo;
  font-size: 12px;
  font-weight: 700;
  line-height: 12px;
`;
const Arrow = styled.img`
  &:hover {
    cursor: pointer;
  }
`;
