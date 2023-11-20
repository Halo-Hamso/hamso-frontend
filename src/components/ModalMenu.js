import { useState, useEffect } from "react";

import { Link } from 'react-router-dom';


import Button from '../components/Button';

import home_account from "../css/Home_Account.module.css";


import hamso_logo from "../images/hamso_logo.svg";
import home_icon from "../images/home_icon.svg";
import book from "../images/book.svg";
import profile from "../images/profile.svg";
import right_now from "../images/right_now.svg";
import pie_chart from '../images/pieChart.svg';



function ModalMenu({ modalMenu, userData }) {

    //로그아웃 함수(시작)//
    const log_out = () => {
        sessionStorage.clear();
        window.location.href = "/";
    }
    //로그아웃 함수(끝)//

    const [menu,setMenu]=useState(false);

    useEffect(()=>{
    if(userData){
        setMenu(true);
    }},[userData])
    //바뀐다음 값이 있는지 확인한 다음에 렌더링하는 법
    //단순히 빈 배열을 두는 것보다 확인하고자 하는 인자를 이렇게 두 번 쓰는게 효과적

    return (<div>
        {menu&&<div className={modalMenu ? home_account.menu_active : home_account.menu}>

            <Link to="/home_account_analysis" style={{ textDecoration: 'none' }}>
                <header className={home_account.header}>
                    <img className={home_account.logo_img} src={hamso_logo}></img>
                    <div className={home_account.text_box}>
                        <p className={home_account.text1}>함소</p>
                        <p className={home_account.text2}>온전히 떠나보낼 수 있도록,</p>
                    </div>
                </header>
            </Link>
            <div className={home_account.profile}>
                <img src={profile} className={home_account.icon}></img>
                <div className={home_account.name_phone}>
                    <p>{userData.name} 님</p>
                    <p style={{fontSize:'12px'}}>
                        {userData.phoneNo.slice(0, 3)}-
                        {userData.phoneNo.slice(3, 7)}-
                        {userData.phoneNo.slice(7, 11)}
                    </p>
                </div>
                <Button className={home_account.log_out}
                    onClick={log_out} text="로그아웃"></Button>
            </div>
            <Link to='/home_account_analysis'
                style={{ textDecoration: 'none' }}
                className={home_account.home}>
                <img src={home_icon} className={home_account.icon}></img>
                <p className={home_account.text3}>홈</p>
            </Link>
            <Link to='/home_account_table'
                style={{ textDecoration: 'none' }}
                className={home_account.account_book}>
                <img src={book} className={home_account.icon}></img>
                <p className={home_account.text4}>부의금 가계부</p>
            </Link>
            <Link to='/home_account_statistics'
                style={{ textDecoration: 'none' }}
                className={home_account.stuff}>
                <img src={right_now} className={home_account.icon}></img>
                <p className={home_account.text4}>실시간 용품 관리</p>
            </Link>
            <Link to='/home_account_statistics'
                style={{ textDecoration: 'none' }}
                className={home_account.secretary}>
                <img src={pie_chart} className={home_account.icon}></img>
                <p className={home_account.text4}>장례식 비서</p>

            </Link>
            <Link to='/home_account_analysis'
                style={{ textDecoration: 'none' }}
                className={home_account.my_page}>
                마이 페이지
            </Link>
        </div>}
        </div>)
}
export default ModalMenu;
