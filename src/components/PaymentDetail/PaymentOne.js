import { PaymentCategory } from './paymentNav';
import { Box } from './paymentNav';
function PaymentOne(props) {
  const paymentInfo = props.paymentInfo;

  return props.type == 'item' ? (
    <PaymentCategory>
      <Box style={{ width: '60px' }}>{paymentInfo.itemType}</Box>
      <Box>{paymentInfo.count}개</Box>
      <Box style={{ width: '70px' }}>
        {' '}
        {paymentInfo.cost.toLocaleString()}원
      </Box>
      <Box> {paymentInfo.active ? '미사용' : '사용완료'}</Box>
    </PaymentCategory>
  ) : (
    <PaymentCategory>
      <Box style={{ width: '60px' }}>{paymentInfo.itemType}</Box>
      <Box style={{ width: '30px' }}>{paymentInfo.count}개</Box>
      <Box style={{ width: '60px' }}>
        {' '}
        {paymentInfo.cost.toLocaleString()}원
      </Box>
      <Box> {paymentInfo.active ? '미사용' : '사용완료'}</Box>
    </PaymentCategory>
  );
}

export default PaymentOne;
