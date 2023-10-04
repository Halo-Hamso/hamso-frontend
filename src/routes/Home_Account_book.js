import { useState, useEffect } from "react";

import { Link } from 'react-router-dom';

import Button from "../components/Button";
import Input from "../components/Input";

import sign_up from "../css/Sign_up.module.css";
import home from "../css/Home.module.css";


import hamso_logo from "../images/hamso_logo.svg";
import eyeOpen from "../images/eyeOpen.svg";
import eyeClose from "../images/eyeClose.svg";
import home_icon from "../images/home.png";
import account from "../images/account.svg";
import profile from "../images/profile.svg";
import right_now from "../images/right_now.svg";


import axios from 'axios'

function Home_Account_book() {
    //로그인 여부 확인 (위)//
    const [login, setLogin] = useState(false);
    const [userData, setUserData] = useState({});
    const login_check = () => {
        const storedTokenData = JSON.parse(sessionStorage.getItem('tokenData'));
        if (storedTokenData) {
            setLogin(true);
            setUserData(JSON.parse(sessionStorage.getItem('userData')))
        } else {
            // window.location.href = "/";
        }
    }
    useEffect(login_check, []);
    //로그인 여부 확인 (밑)//

    //로그아웃 함수//
        const log_out = () =>{
            sessionStorage.clear();
            window.location.href="/";
        } 
    //로그아웃 함수(밑)//

    return (
        <div>
            <div className={home.menu}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <header className={home.header}>
                        <img className={home.logo_img} src={hamso_logo}></img>
                        <div className={home.text_box}>
                            <p className={home.text1}>함소</p>
                            <p className={home.text2}>온전히 떠나보낼 수 있도록,</p>
                        </div>
                    </header>
                </Link>
                <div className={home.profile}>
                        <img src={profile} className={home.icon}></img>
                    <div className={home.name_phone}>
                        <p>{userData.name} 님</p>
                        {/* <p>
                            {userData.phoneNo.slice(0, 3)}-
                            {userData.phoneNo.slice(4, 8)}-
                            {userData.phoneNo.slice(9, 13)}
                        </p> */}
                    </div>
                    <Button className={home.log_out} 
                    onClick={log_out} text="로그아웃"></Button>
                </div>
                <div className={home.home}>
                    <img src={home_icon} className={home.icon}></img>
                    <p className={home.text3}>홈</p>
                </div>
                <div className={home.account_book}>
                    <img src={account} className={home.icon}></img>
                    <p className={home.text4}>부의금 가계부</p>
                </div>
                <div className={home.stuff}>
                    <img src={right_now} className={home.icon}></img>
                    <p className={home.text4}>실시간 용품 관리</p>
                </div>
                <div className={home.text5}>마이 페이지</div>
            </div>

            <main>
                <div className={home.board}>
                    <div>
                        <p>부의금 가계부</p>
                        <div></div>
                    </div>
                    <div className={home.mainBoard}>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home_Account_book;