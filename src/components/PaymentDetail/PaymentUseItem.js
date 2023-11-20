import { useEffect, useState } from 'react';
import { getUseItemApi } from '../../Apis/CustomApis';
import Pagination from '@mui/material/Pagination';
import PaymentOne from './PaymentOne';

function PaymentUseItem() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const info = { page: page, size: 8 };

  useEffect(() => {
    getUseItemApi(info)
      .then((res) => {
        console.log(res);
        setTotalPages(res.data.pageInfo.totalPages);
        setData(res.data.billInfos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [info.page]);
  const handlePage = (e, v) => {
    console.log(page);
    setPage(v);
  };
  return (
    <div>
      <div>
        {data.map((e) => {
          return <PaymentOne paymentInfo={e} type="useItem" />;
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

export default PaymentUseItem;
