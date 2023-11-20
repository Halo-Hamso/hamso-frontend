import UserHomeNav from '../components/UserHome/Nav/UserHomeNav';
import PaymentUseItem from '../components/PaymentDetail/PaymentUseItem';
import PaymentItem from '../components/PaymentDetail/paymentItem';
import { useState } from 'react';
import PaymentNav from '../components/PaymentDetail/paymentNav';
import SelectPopup from '../components/PaymentDetail/SelectPopup';

function UserHomePayment() {
  const [popup, setPopup] = useState(false);
  const [type, setType] = useState('item');

  return (
    <div>
      <UserHomeNav />
      <div onClick={() => setPopup(true)}>
        <PaymentNav type={type} />
      </div>
      {type == 'userItem' ? <PaymentUseItem /> : <PaymentItem />}

      {popup ? (
        <SelectPopup setType={setType} setPopup={setPopup} type={type} />
      ) : (
        ''
      )}
    </div>
  );
}

export default UserHomePayment;
