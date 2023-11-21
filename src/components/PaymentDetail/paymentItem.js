import { useEffect, useState } from 'react';
import { getItemApi } from '../../Apis/CustomApis';
import Pagination from '@mui/material/Pagination';
import PaymentOne from './PaymentOne';

function PaymentItem() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const info = { page: page, size: 8 };

  useEffect(() => {
    getItemApi(info)
      .then((res) => {
        setTotalPages(res.data.pageInfo.totalPages);
        setData(res.data.billInfos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  const handlePage = (e, v) => {
    console.log(page);
    setPage(v - 1);
  };
  return (
    <div>
      <div>
        {data.map((e) => {
          return <PaymentOne paymentInfo={e} type="item" />;
        })}
      </div>

      <div
        style={{
          width: '90vw',
          margin: '20px auto',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Pagination count={totalPages} onChange={handlePage} shape="rounded" />
      </div>
    </div>
  );
}

export default PaymentItem;
