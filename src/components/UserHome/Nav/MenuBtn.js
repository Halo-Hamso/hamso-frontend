import styled from 'styled-components';
function MenuBtn(prop) {
  return (
    <div>
      <MenuImg>
        <img src={prop.imgName}></img>
      </MenuImg>
      <MenuText>{prop.text}</MenuText>
    </div>
  );
}

export default MenuBtn;

const MenuImg = styled.div`
  display: flex;
  justify-content: center;
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
