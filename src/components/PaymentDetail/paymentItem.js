import { useEffect, useState } from 'react';
import { getItemApi } from '../../Apis/CustomApis';
import Pagination from '@mui/material/Pagination';
function PaymentItem() {
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
      <div>용품별 결제내역</div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: '10px' }}>장례용품</div>
        <div style={{ marginLeft: '10px' }}>개수</div>
        <div style={{ marginLeft: '10px' }}>비용</div>
        <div style={{ marginLeft: '10px' }}>상태</div>
      </div>
      <Pagination count={10} onChange={handlePage} shape="rounded" />
    </div>
  );
}

export default PaymentItem;
