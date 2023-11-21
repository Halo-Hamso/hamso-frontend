import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
function MenuBtn(prop) {
  const navigate = useNavigate();
  const handleClickMenu = () => {
    navigate(`/userhome/${prop.path}`);
  };
  return (
    <div style={{ width: '73px' }}>
      <MenuImg>
        <img src={prop.imgName} onClick={handleClickMenu}></img>
      </MenuImg>
      <MenuText>{prop.text}</MenuText>
    </div>
  );
}

export default MenuBtn;

const MenuImg = styled.div`
  display: flex;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
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
