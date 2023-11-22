import styled from 'styled-components';
import downArrow from '../../images/downArrow.svg';
function PaymentNav(props) {
  console.log(props);
  let title = '';
  props.type == 'item'
    ? (title = '용품별 결제 내역')
    : (title = '실시간 결제 내역');
  return (
      <FlexBox_Column>
        <PaymentType>
          {title} <img style={{marginLeft:'8px'}}src={downArrow}></img>
        </PaymentType>
        <PaymentCategory>
          {props.type == 'item' ? '' : <Box>시간</Box>}
          <Box>장례 용품</Box>
          <Box>개수</Box>
          <Box>비용</Box>
          {props.type == 'item' ? <Box>상태</Box> : ''}
        </PaymentCategory>
        <Line></Line>
      </FlexBox_Column>
  );
}

export default PaymentNav;

const FlexBox_Column = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;

const PaymentType = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom:30px;
  width: 200px;
  padding:8px;
  border-radius: 15px;
  border: 1px solid #799094;

  font-size: 20px;
  font-weight: 700;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) and (min-width:280px) {
    width: 144px;
    font-size: 12px;
    margin-bottom:4px;
    font-size: 12px;
  }
`;

export const PaymentCategory = styled.div`
  width:80vw;
  margin-top: 20px;


  display: grid;
  grid-template-columns : 2fr 1fr 3fr 2fr;
  font-size:16px;
  @media screen and (max-width: 1024px) and (min-width:280px) {
    font-size: 12px;
  }
  font-weight: 800;
  color: #333333;
`;

export const Box = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Line = styled.div`
  width:75vw;
  border: 1px solid #ececec;
  margin: 0 auto;
  margin-top: 10px;
`;
