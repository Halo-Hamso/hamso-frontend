import UserHomeChart from '../components/UserHome/UserHomeChart';
import UserHomeNav from '../components/UserHome/Nav/UserHomeNav';
import PaymentUseItem from '../components/PaymentDetail/PaymentUseItem';
import PaymentItem from '../components/PaymentDetail/paymentItem';

function UserHome() {
  return (
    <div>
      <UserHomeNav />
      <UserHomeChart />
      <PaymentUseItem />
      <PaymentItem />
    </div>
  );
}

export default UserHome;
