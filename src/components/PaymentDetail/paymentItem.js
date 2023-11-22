import { useEffect, useState } from 'react';
import { getItemApi } from '../../Apis/CustomApis';
import Pagination from '@mui/material/Pagination';
import PaymentOne from './PaymentOne';

import styled from 'styled-components';

function PaymentItem() {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(0);
  const info = { page: page, size: 3 };

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
    <FlexBox_Column>
       <FlexBox_Column style={{marginBottom:'4vw'}}>
        {data.map((e) => {
          return <PaymentOne paymentInfo={e} type="item" />;
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

export default PaymentItem;

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
