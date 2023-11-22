import { PaymentCategory } from './paymentNav';
import { Box } from './paymentNav';
function PaymentOne(props) {
  const paymentInfo = props.paymentInfo;

  return props.type == 'item' ? (
    <PaymentCategory>
      <Box>{paymentInfo.itemType}</Box>
      <Box>{paymentInfo.count}개</Box>
      <Box>
        {' '}
        {paymentInfo.cost.toLocaleString()}원
      </Box>
      <Box> {paymentInfo.active ? '미사용' : '사용완료'}</Box>
    </PaymentCategory>
  ) : (
    <PaymentCategory>
      <Box>{paymentInfo.itemType}</Box>
      <Box>{paymentInfo.count}개</Box>
      <Box>
        {' '}
        {paymentInfo.cost.toLocaleString()}원
      </Box>
      <Box> {paymentInfo.active ? '미사용' : '사용완료'}</Box>
    </PaymentCategory>
  );
}

export default PaymentOne;
