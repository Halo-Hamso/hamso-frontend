import { useState, useEffect } from "react";

import styled from 'styled-components';

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
width: 380px;
flex-shrink: 0;
border: 1px solid var(--MAIN, #493B39);

padding-top:5%;
padding-bottom:5%;

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

${BackPage}{
  display: flex;
    justify-content: center;
    align-items: flex-start;
img{}
p{}
}
${Btn_Selection}{
  ${Text1}{

  }
  ${Text2}{

  }
}
`;



function Sign_up_select() {

  return (
    <Root>
      <Link to="/" style={{ textDecoration: "none" }}>
        <Header>
          <img src={hamso_logo}></img>
          <TextBox>
            <Text1>함소</Text1>
            <Text2>온전히 떠나보낼 수 있도록,</Text2>
          </TextBox>
        </Header>
      </Link>
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
              <Text2>유족 회원가입하러가기▶︎</Text2>
            </Btn_Selection>
          </Link>
          <Link to="/sign_up_business" style={{ textDecoration: "none" }}>
            <Btn_Selection>
              <Text1>비즈니스</Text1>
              <Text2>비즈니스 회원가입하러가기▶︎</Text2>
            </Btn_Selection>
          </Link>
        </FlexBox_Row>
      </Main>
    </Root>
  );
}


export default Sign_up_select
