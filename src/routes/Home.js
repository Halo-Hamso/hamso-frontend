import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import Button from "../components/Button";
import Input from "../components/Input";

import sign_up from "../css/Sign_up.module.css";
import home from "../css/Home.module.css";

import hamso_logo from "../images/hamso_logo.svg";
import eyeOpen from "../images/eyeOpen.svg";
import eyeClose from "../images/eyeClose.svg";

import axios from "axios";

function Home() {
  //로그인 여부 확인 (위)//
  const [login, setLogin] = useState(false);
  const [userData, setUserData] = useState({});
  const login_check = () => {
    const storedTokenData = JSON.parse(sessionStorage.getItem("tokenData"));
    if (storedTokenData) {
      setLogin(true);
      setUserData(JSON.parse(sessionStorage.getItem("userData")));
    } else {
      window.location.href = "/";
    }
  };
  useEffect(login_check, []);
  //로그인 여부 확인 (밑)//

  //로그아웃 함수//
  const log_out = () => {
    sessionStorage.clear();
    window.location.href = "/";
  }; // 로그아웃 함수(밑)//

  return (
    <div>
      <div className={home.menu}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <header className={home.header}>
            <img className={home.logo_img} src={hamso_logo}></img>
            <div className={home.text_box}>
              <p className={home.text1}>함소</p>
              <p className={home.text2}>온전히 떠나보낼 수 있도록,</p>
            </div>
          </header>
        </Link>
        <div className={home.profile}>
          <div className={home.icon}>
            <img></img>
            <p>내 정보</p>
          </div>
          <div>
            <p>{userData.name} 님</p>
            <p>
              {userData.phoneNo.slice(0, 3)}-{userData.phoneNo.slice(4, 8)}-
              {userData.phoneNo.slice(9, 13)}
            </p>
          </div>
          <Button onClick={log_out} text="로그아웃"></Button>
        </div>
        <div className={home.home}>
          <img></img>
          <p>홈</p>
        </div>
        <div className={home.account_book}>
          <img></img>
          <p>부의금 가계부</p>
        </div>
        <div className={home.stuff}>
          <img></img>
          <p>실시간 용품 관리</p>
        </div>
      </div>

      <main>
        <div className={home.board}>
          <div className={home.content}>
            <p>
              누군가를 온전히
              <br></br>
              떠나보낼 수 있도록
            </p>
            <p>실시간 장례 비용 확인 상조 서비스 헤일로</p>

            <div>
              <div className={home.concil}>
                <p>실시간 상담받기</p>
                <img></img>
              </div>
              <div className={home.tel}>
                <img></img>
                <p>XXX-XXX-XXXX</p>
              </div>
            </div>
          </div>
          <img></img>
          <div className={home.buttons}>
            <img></img>
            <img></img>
            <img></img>
          </div>
          <img className={home.headset}></img>
        </div>
      </main>
    </div>
  );
}

export default Home;
