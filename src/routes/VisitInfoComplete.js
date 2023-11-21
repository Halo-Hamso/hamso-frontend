import sign_up from '../css/Sign_up.module.css';
import hamso_logo from '../images/hamso_logo.svg';
import visitStyle from '../css/visitStyle.module.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function VisitInfoComplete() {
  const navigate = useNavigate();
  const handleCheck = () => {
    navigate('/visitInfo');
  };
  return (
    <div style={{ margin: '0 auto' }}>
      <div className={visitStyle.visitInfoBox}>
        <div className={visitStyle.logoBox}>
          <div className={visitStyle.imgBackground}>
            <img
              src={hamso_logo}
              className={sign_up.logo_img}
              style={{ marginLeft: '40px', marginRight: '-25px' }}
            ></img>
            <div style={{ marginLeft: '14px' }}>
              <p className={visitStyle.hamsoText}>함소</p>
              <p className={visitStyle.hamsoUnderText}>
                온전히 떠나보낼 수 있도록
              </p>
            </div>
          </div>
        </div>
        <div className={visitStyle.text}>
          <p>제출되었습니다.</p>
          <Button onClick={handleCheck}>확인</Button>
        </div>
      </div>
    </div>
  );
}
export default VisitInfoComplete;
const Button = styled.button`
  background-color: #999;
  margin-top: 50px;
  width: 100px;
  height: 30px;
  color: #fff;

  border: 0px;
  &:hover {
    cursor: pointer;
  }
`;
