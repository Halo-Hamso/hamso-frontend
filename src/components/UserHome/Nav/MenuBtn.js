import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
function MenuBtn(prop) {
  const navigate = useNavigate();
  const handleClickMenu = () => {
    if (prop.path === 'home' || prop.path === 'payment')
      navigate(`/userhome/${prop.path}`);
    else if (prop.path == 'helper') navigate('/home_account_statistics');
  };
  const location = window.location.pathname.slice(10);
  return (
    <div style={{ width: '73px' }}>
      <MenuImg>
        <img src={prop.imgName} onClick={handleClickMenu}></img>
      </MenuImg>
      <MenuText>{prop.text} </MenuText>
      {prop.path === location ? <Line /> : ''}
    </div>
  );
}

export default MenuBtn;

const Line = styled.div`
  width: 48px;
  border: 1px solid #475a5d;
  margin: 10px auto;
`;
const MenuImg = styled.div`
  display: flex;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
  margin-top: 10px;
`;
const MenuText = styled.div`
  font-family: NanumMyeongjo;
  font-size: 10px;
  font-weight: 700;
  color: #333333;
  margin-top: 5px;
  justify-content: center;
  display: flex;
`;
