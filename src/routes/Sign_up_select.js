import { useState, useEffect } from "react";

import styled from 'styled-components';

import Banner from '../components/Banner';

import login from '../css/Log_in.module.css'

import axios from "axios";

import { Link } from "react-router-dom";

import hamso_logo from "../images/hamso_logo.svg";
import back_page from "../images/backPage.svg";

const Root = styled.div`
    box-sizing: border-box;

font-family: 'NanumMyeongjo', serif;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding:5%;
`

const FlexBox_Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
const FlexBox_Column = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const TextBox = styled.div``;
const Text1 = styled.p``;
const Text2 = styled.p``;
const Text3 = styled.p``;



const Header = styled.div`
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;


img {
    width: 96px;
    height: 96px;
    flex-shrink: 0;
}

${TextBox} {
    width: 186px;
    height: 76px;
    
    margin-left:-16px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    ${Text1} {
    color: var(--Main, #493B39);
    font-size: 36px;
    font-weight: 800;
    letter-spacing: 5.76px;
    }
    ${Text2} {
    color: #999;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: 12px;
    /* 100% */
  }
}
`;

const BackPage = styled.div``;
const Btn_Selection = styled.div``;
const Main = styled.div`
position:relative;
width: 518px;
height: 432px;
flex-shrink: 0;
flex-shrink: 0;
border-radius: 20px;
border: 1px solid #766C6B;
background: rgba(217, 217, 217, 0.00);

padding-top:5%;
padding-bottom:5%;

display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
gap:20px;

@media screen and (max-width: 480px) and (min-width:280px){
  padding-top:10vw;
  
  width:90vw;
  height:80vw;
  gap:10px;
}

${BackPage}{
  position:absolute;
  top:5%;
  left:5%;
  display: flex;
    justify-content: center;
    align-items: flex-start;
img{
  width: 24px;
height: 24px;
flex-shrink: 0;
}
p{
  color: var(--Font2, #555);
font-size: 16px;
font-style: normal;
font-weight: 600;
line-height: 24px; /* 150% */
}
}
${Text3}{
  color: #333;
font-size: 24px;
font-style: normal;
font-weight: bold;
line-height: 32px; /* 133.333% */
}
${FlexBox_Row}{
  gap: 12px;
  @media screen and (max-width: 480px) and (min-width:280px){
  gap:6px;
}
${Btn_Selection}{
  width: 184px;
height: 184px;
flex-shrink: 0;
  border-radius: 16px;
border: 1px solid var(--BC2, #FC4);
cursor:pointer;

display:flex;
flex-direction:column;
justify-content:space-between;
align-items:flex-start;

padding:10%;
padding-bottom:15%;

@media screen and (max-width: 480px) and (min-width:280px){
  width:40vw;
  height:40vw;
}

  ${Text1}{
    color: var(--Font1, #333);
font-size: 32px;
@media screen and (max-width: 480px) and (min-width:280px){
  font-size:24px;
}
font-style: normal;
font-weight: 600;
line-height: 48px; /* 150% */
  }
  ${Text2}{
    color: var(--Font2, #555);
font-size: 16px;
@media screen and (max-width: 480px) and (min-width:280px){
  font-size:12px;
}
font-style: normal;
font-weight: 600;
line-height: 24px; /* 150% */
  }
}
}
`;



function Sign_up_select() {

  return (
    <Root>
      <Banner></Banner>
      <Main>
        <Link to="/" style={{ textDecoration: "none" }}>
          <BackPage>
            <img src={back_page}></img>
            <p>뒤로가기</p>
          </BackPage>
        </Link>
        <Text3>
          회원 유형 선택
        </Text3>
        <FlexBox_Row>
          <Link to="/sign_up_family" style={{ textDecoration: "none" }}>
            <Btn_Selection>
              <Text1>유족</Text1>
              <Text2>유족<br></br>회원가입하러가기 ▶︎</Text2>
            </Btn_Selection>
          </Link>
          <Link to="/sign_up_business" style={{ textDecoration: "none" }}>
            <Btn_Selection>
              <Text1>비즈니스</Text1>
              <Text2>비즈니스<br></br>회원가입하러가기 ▶︎</Text2>
            </Btn_Selection>
          </Link>
        </FlexBox_Row>
      </Main>
    </Root>
  );
}


export default Sign_up_select
