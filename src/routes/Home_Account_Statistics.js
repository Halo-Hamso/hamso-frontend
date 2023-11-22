import { useState, useEffect } from "react";

import ModalMenu from "../components/ModalMenu";

import home_account from "../css/Home_Account.module.css";

import { PieChart } from 'react-minimal-pie-chart';

import dotBar from '../images/dotBar.svg';

import axios from 'axios'

function Home_Account_Statistics() {
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
            window.location.href = "/";
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



    const [modalMenu, setModalMenu] = useState(false);
    const [visitedList, setVisitedList] = useState({});
    const [familyList, setFamilyList] = useState({});
    const [visitedChart, setVisitedChart] = useState({});
    const [familyChart, setFamilyChart] = useState({});
    const [totalMoney,setTotalMoney]=useState(0);
    const [fetched, setFetched] = useState(false);
    const [colors1, setColors1] = useState([
        'rgb(20, 10, 10)',
        'rgb(40, 30, 30)',
        'rgb(60, 45, 45)',
        'rgb(80, 60, 60)',
        'rgb(100,75,75)',
        'rgb(120, 100, 100)',
        'rgb(140, 120, 120)',
        'rgb(160,140,140)',
        'rgb(180, 160, 160)',
        'rgb(200, 180, 180)',
    ]);
    const [colors2, setColors2] = useState([
        'rgb(20, 10, 10)',
        'rgb(40, 30, 30)',
        'rgb(60, 45, 45)',
        'rgb(80, 60, 60)',
        'rgb(100,75,75)',
        'rgb(120, 100, 100)',
        'rgb(140, 120, 120)',
        'rgb(160,140,140)',
        'rgb(180, 170, 170)',
        'rgb(200, 190, 190)',
    ])

    const onClick_menu = () => {
        setModalMenu(!modalMenu);
    }

    const fetchStatistics = async () => {
        const STATISTICSURL = `http://3.34.24.140:9998/account-book/statistics/1`;
        //id가 phoneNo

        try {
            const response = await axios.get(STATISTICSURL,
                {
                    headers: {
                        'Authorization': `Bearer ${userData.token}`,
                        withCredentials: true,
                    }
                });
            setVisitedList(response.data.visitedToMoney)
            setVisitedChart(response.data.visitedToMoney.map(
                (item, index) => (
                    {
                        value: item.money,
                        color: colors1[index % 10]
                    }
                )
            ));

            setFamilyList(response.data.familyNameMoney);
            setFamilyChart(response.data.familyNameMoney.map(
                (item, index) => (
                    {
                        value: item.money,
                        color: colors2[index*3 % 10]
                    }
                )
            ));
            setTotalMoney(response.data.totalMoney);
            setFetched(true);
            console.log("statisticsList fetch succeeded!",
                response.data);
        } catch (error) {
            console.log("statisticsList fetch failed ;", error);
        }
    }

    useState(() => { fetchStatistics() }, [])
    return (
        <div className={home_account.root}>
            <div
                className={home_account.btn_close}
                onClick={onClick_menu}>
                {modalMenu ? "✕" : "☰"}
            </div>
            <ModalMenu
                modalMenu={modalMenu}
                userData={userData}>
            </ModalMenu>

            <main className={home_account.board}>

                <div className={home_account.statistics}>
                    <div className={home_account.text_statistics}>부의금 통계</div>
                    
                    {fetched && <div className={home_account.flexbox_row} style={{width:'100%'}}>
                        <div className={home_account.total_money}>부의금 총액</div>
                        <div className={home_account.total_money}>{totalMoney}원</div>
                    </div>}

                    {fetched && <div className={home_account.ChartBox}>
                        
                        <div className={home_account.chart}>
                            <div className={home_account.chart_box}>
                                <PieChart
                                    data={familyChart}
                                    label={({ dataEntry }) => dataEntry.title}
                                    viewBoxSize={[100, 100]}
                                    
                                ></PieChart>
                            </div>
                            <div className={home_account.table_chart}>
                                <p className={home_account.text_statistics2}>가족별 통계</p>
                                {familyList.map(
                                    (item, key) =>
                                        <div key={key} className={home_account.legend}>
                                            <div className={home_account.flexbox_row}>
                                                <div style={{
                                                    backgroundColor: colors2[key % 10],
                                                }}
                                                className={home_account.legend_icon}></div>
                                                <p>{item.familyName}</p>
                                            </div>
                                            <img className={home_account.legend_dotBar1}
                                            src={dotBar}></img>
                                            <p>{item.money}원</p>
                                        </div>)}
                            </div>
                        </div>
                        <div className={home_account.chart}>
                            <div className={home_account.chart_box}>
                                <PieChart
                                    data={visitedChart}
                                    label={({ dataEntry }) => dataEntry.title}
                                    viewBoxSize={[100, 100]}
                                ></PieChart>
                            </div>
                            <div className={home_account.table_chart}>
                                <p className={home_account.text_statistics2}>개인별 통계</p>
                                {visitedList.map(
                                    (item, key) =>
                                        <div key={key} className={home_account.legend}>
                                            <div className={home_account.flexbox_row}>
                                                <div style={{
                                                    backgroundColor: colors1[key % 10],
                                                }}
                                                className={home_account.legend_icon}></div>
                                                <p>{item.visitedTo}</p>
                                            </div>
                                            <img className={home_account.legend_dotBar2}
                                            src={dotBar}></img>
                                            <p>{item.money}원</p>
                                        </div>)}
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </main>
        </div>
    )
}

export default Home_Account_Statistics;
