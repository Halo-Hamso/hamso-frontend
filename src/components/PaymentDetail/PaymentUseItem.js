import { useEffect, useState } from 'react';
import { getUseItemApi } from '../../Apis/CustomApis';
import Pagination from '@mui/material/Pagination';

function PaymentUseItem() {
  const [page, setPage] = useState(1);
  const info = { page: page, size: 8 };

  useEffect(() => {
    getUseItemApi(info)
      .then((res) => {
        console.log(res);
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
      <div>실시간 결제내역</div>
      <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: '10px' }}>사용 시간</div>
        <div style={{ marginLeft: '10px' }}> 장례용품</div>
        <div style={{ marginLeft: '10px' }}>개수</div>
        <div style={{ marginLeft: '10px' }}>비용</div>
      </div>
      <Pagination count={10} onChange={handlePage} shape="rounded" />
    </div>
  );
}

export default PaymentUseItem;
