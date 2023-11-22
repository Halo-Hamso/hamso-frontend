import { useEffect, useState } from 'react';
import { getUseItemApi } from '../../Apis/CustomApis';
import Pagination from '@mui/material/Pagination';
import PaymentOne from './PaymentOne';

import styled from 'styled-components';

function PaymentUseItem() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
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
    setPage(v - 1);
  };
  return (
    <FlexBox_Column>
      <FlexBox_Column style={{marginBottom:'4vw'}}>
        {data.map((e) => {
          return <PaymentOne paymentInfo={e} type="useItem" />;
        })}
      </FlexBox_Column>
        <Pagination 
        sx={{
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',
      }}
        count={totalPages} 
        onChange={handlePage} 
        shape="rounded" />
    </FlexBox_Column>
  );
}

export default PaymentUseItem;

const PaymentItems = styled.div`
width:80vw;
height:80vh;
display: grid;
grid-template-columns : 2fr 1fr 3fr 2fr;
`;
const FlexBox_Column = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`;
