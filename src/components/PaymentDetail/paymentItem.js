import { useEffect, useState } from 'react';
import { getItemApi } from '../../Apis/CustomApis';
import Pagination from '@mui/material/Pagination';
import PaymentOne from './PaymentOne';

function PaymentItem() {
  const data = [
    { itemType: '식사', count: 10, cost: '10000', active: true },
    { itemType: '식사', count: 10, cost: '10000', active: true },
    { itemType: '식사', count: 10, cost: '10000', active: true },
  ];
  const [page, setPage] = useState(1);
  const info = { page: page, size: 8 };
  useEffect(() => {
    console.log(info);
    getItemApi(info)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  const handlePage = (e, v) => {
    console.log(page);
    setPage(v);
  };
  return (
    <div>
      <div>
        {data.map((e) => {
          return <PaymentOne paymentInfo={e} />;
        })}
      </div>

      <Pagination count={10} onChange={handlePage} shape="rounded" />
    </div>
  );
}

export default PaymentItem;
