import { PaymentCategory } from './paymentNav';
import { Box } from './paymentNav';
function PaymentOne(props) {
  const paymentInfo = props.paymentInfo;

  return (
    <PaymentCategory>
      <Box>{paymentInfo.itemType}</Box>
      <Box>{paymentInfo.count}</Box>
      <Box> {paymentInfo.cost}</Box>
      <Box> {paymentInfo.active ? '미사용' : '사용완료'}</Box>
    </PaymentCategory>
  );
}

export default PaymentOne;
