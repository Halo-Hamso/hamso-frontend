import { useState, useEffect } from "react";

import { Link } from 'react-router-dom';

import styled from 'styled-components';

import Button from '../components/Button';

import home from "../css/Home.module.css";


import hamso_logo from "../images/hamso_logo.svg";
import home_icon from "../images/home_icon.svg";
import book from "../images/book.svg";
import profile from "../images/profile.svg";
import right_now from "../images/right_now.svg";
import glasses from "../images/glasses.svg"
import dot_bar from "../images/dot_bar.svg"

import { PieChart } from 'react-minimal-pie-chart';

import axios from 'axios'

function Home_Account_book() {
    //로그인 여부 확인 (시작)//
    const [login, setLogin] = useState(false);
    const [userData, setUserData] = useState({});
    const login_check = () => {
        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        if (storedUserData) {
            setLogin(true);
            setUserData(storedUserData);
        } else {
            alert("로그인이 필요한 페이지입니다!");
            // window.location.href = "/";
        }
    }
    useEffect(login_check, []);
    //로그인 여부 확인 (끝)//

    //로그아웃 함수(시작)//
    const log_out = () => {
        sessionStorage.clear();
        window.location.href = "/";
    }
    //로그아웃 함수(끝)//





    const accountURL = `http://3.34.24.140:9998/account-book/${userData.phoneNo}`;
    //id가 phoneNo
    
    const [modalMenu,setModalMenu] = useState(false);
    const [account, setAccount] = useState("");
    const [accountList, setAccountList] = useState({});
    const [accountScreen, setAccountScreen] = useState([]);
    const [screenNum, setScreenNum] = useState();
    const [currentNum, setCurrentNum] = useState(1);
    const [numList, setNumList] = useState([]);
    const [statisticsList, setStatisticsList] = useState({});
    const [personalList, setPersonalList] = useState({});

    const onClick_menu = () =>{
        setModalMenu(!modalMenu);
    }
    const onChange = (event) => {
        event.preventDefault();
        setAccount(event.target.value);
    }
    const fetchAccount = async () => {
        try {
            const response = await axios.get(accountURL);
            setAccountList(response.data.accountList);
            console.log("accountList fetch succeeded!");

//            setScreenNum(response.data.pageinfo.totalPages);
            setCurrentNum(1);
        } catch (error) {
            console.log("accountList fetch failed ;", error);
        }
    }
    const onClick_index = (event) => {
        event.preventDefault();
        setCurrentNum(Number(event.target.value));
    }
    //useEffect(() => { fetchData() }, [])
    //useEffect에는 async와 return문 모두 안 됨
    useEffect(() => {
        let cnt = 0;
        let tmp = [];
        for (let i = 0; i < accountList.length; i++) {
            tmp.push(accountList[i]);
            if (i % 5 === 4) {
                accountScreen.push(tmp);
                tmp.splice(0);  //배열 원소 전부 삭제
            } else if (i === accountList.length - 1) {
                accountScreen.push(tmp);
                tmp.splice(0);
            }
        }
//        setScreenNum(accountScreen.length);
        setScreenNum(5);
        setCurrentNum(1);
    }, [])

    useEffect(()=>{
        numList.splice(0);
        for (let i = 0; i < 5; i++) {
            numList.push(i + 1);
        }
    },[screenNum])

    return (
        <div className={home.root}>
            <div
                className={home.btn_close}
                onClick={onClick_menu}>
                {modalMenu ? "✕" : "☰"}
            </div>
            <div className={modalMenu ? home.menu_active : home.menu}>

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
                    <img src={book} className={home.icon}></img>
                    <p className={home.text4}>부의금 가계부</p>
                </div>
                <div className={home.stuff}>
                    <img src={right_now} className={home.icon}></img>
                    <p className={home.text4}>실시간 용품 관리</p>
                </div>
                <div className={home.my_page}>마이 페이지</div>
            </div>

            <main className={home.mainboard}>
                <div className={home.board}>
                    <div>
                        <p className={home.text_account}>부의금 가계부</p>
                        <p className={home.text_update}>업데이트 : 2023-09-20 19:16:04 </p>
                    </div>
                    <div className={home.searchBox}>
                        <img src={glasses} onClick={fetchAccount}></img>
                        <input
                            className={home.searchInput}
                            onChange={onChange}
                            placeholder="검색내용 (ex, 신혜영, 헤일로컴퍼니...)">
                        </input>
                    </div>
                    <table className={home.table}>
                        <thead className={home.table_head}>
                            <tr>
                                <td>/</td>
                                <td>조문객 성함</td>
                                <td>소속</td>
                                <td>방문한 유족</td>
                                <td>유족과의 관계</td>
                                <td>부의금</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>#0004</td>
                                <td>신혜영</td>
                                <td>헤일로컴퍼니</td>
                                <td>김태운</td>
                                <td>직장 상사</td>
                                <td>200,000원</td>
                            </tr>
                        </tbody>
                        {/*<tbody>
                                {accountScreen[currentNum].map(
                                    (item)=><tr>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.belong}</td>
                                        <td>{item.who}</td>
                                        <td>{item.relationship}</td>
                                        <td>{item.money}원</td>
                                    </tr>)}
                                </tbody>*/}
                    </table>
                    <div className={home.bar_blank}></div>
                    <div className={home.index}>
                        {numList.map(
                            (item, index) => {
                                if (index + 1 === currentNum) {
                                    return <Button
                                        className={home.clicked_index}
                                        onClick={onClick_index}
                                        text={item}
                                        value={index + 1}>
                                    </Button>
                                } else {
                                    return <Button
                                        className={home.unclicked_index}
                                        onClick={onClick_index}
                                        text={item}
                                        value={index + 1}>
                                    </Button>
                                }
                            })}
                    </div>
                </div>
                <div className={home.statistics}>
                    <div className={home.text_statistics}>부의금 통계</div>
                    <div className={home.ChartBox}>
                        <div className={home.chart}>
                            <div className={home.chart_box}>
                                <PieChart
                                    data={[
                                        { value: 30, color: '#D0D0D0' },
                                        { value: 50, color: '#493B39' },
                                        { value: 40, color: '#69534E' },
                                        { value: 20, color: '#998F8C' }
                                    ]}
                                    label={({ dataEntry }) => dataEntry.title}
                                    viewBoxSize={[100, 100]}
                                ></PieChart>
                            </div>
                            <div className={home.table_chart}>
                                <p className={home.text_statistics2}>가족별 통계</p>
                                {/*statisticsList.map(
                                        (item) => <div>
                                            <div className={home.square}></div>
                                            <p>{item.family}</p>
                                            <img src={dot_bar}></img>
                                            <p>{item.family_money}</p>
                                            <p>원</p>
                                    </div>)*/}
                            </div>
                        </div>
                        <div className={home.chart}>
                            <div className={home.chart_box}>
                                <PieChart
                                    data={[
                                        { value: 90, color: '#49393F' },
                                        { value: 30, color: '#D0D0D0' },
                                        { value: 20, color: '#69534E' }
                                    ]}
                                    label={({ dataEntry }) => dataEntry.title}
                                    viewBoxSize={[100, 100]}
                                ></PieChart>
                            </div>
                            <div className={home.table_chart}>
                                <p className={home.text_statistics2}>개인별 통계</p>
                                {/*personalList.map(
                                        (item) => <div>
                                            <p>{item.family}</p>
                                            <img src={dot_bar}></img>
                                            <p>{item.family_money}</p>
                                            <p>원</p>
                                    </div>)*/}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Home_Account_book;