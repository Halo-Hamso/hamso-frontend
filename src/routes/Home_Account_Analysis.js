import { useState, useEffect } from "react";

import ModalMenu from '../components/ModalMenu';
import BarChart from '../components/BarChart';

import home_account from "../css/Home_Account.module.css";

import axios from 'axios'

function Home_Account_Analysis() {
    //로그인 여부 확인 (시작)//
    let first = true;
    const [login, setLogin] = useState(false);
    const [userData, setUserData] = useState({});
    const login_check = () => {
        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        if (storedUserData) {
            setLogin(true);
            setUserData(storedUserData);
            console.log('get userData succeed!');
        } else {
            alert("로그인이 필요한 페이지입니다!");
            window.location.href = "/";
            first = false;
        }
    }
    useEffect(() => { if (first) login_check(); }, []);
    //로그인 여부 확인 (끝)//

    const analysisURL = `http://3.34.24.140:9998/account-book/chart`;
    //id가 phoneNo

    const [dateParams, setDateParams] = useState(new Date('2023-11-17'))
    const [profitData, setProfitData] = useState([]);
    const [expenseData, setExpenseData] = useState([
        {
            "time": "00-00",
            "expense": 0,
        },
        {
            "time": "24-00",
            "expense": 100,
        },
    ])
    const [datas, setDatas] = useState([]);
    const [dateList, setDateList] = useState([
        '2023-11-17',
        '2023-11-16',
        '2023-11-15'
    ])
    const [modalMenu, setModalMenu] = useState(false);


    const onClick_menu = () => {
        setModalMenu(!modalMenu);
    }
    const fetchExpense = async (date_params) => {
        const year = date_params.getFullYear();
        const month = date_params.getMonth() + 1;
        const day = date_params.getDate();
        const date = year.toString().padStart(2, '0') + '-' +
            month.toString().padStart(2, '0') + '-' +
            day.toString().padStart(2, '0');
        const option = 0;

        console.log('date,option:', date, option);
        try {
            const response = await axios.get(analysisURL,
                { params: { date, option } });
            if (response.data === null)
                console.log('해당 날짜의 데이터가 없습니다!');
            else
                console.log('response.data:', response.data)

            setProfitData(response.data['profits'].map((item) => ({
                'time': Number(item.date.slice(0, 2)),
                '수입': Math.floor(item.money / 1000) / 10
            })));

            setExpenseData(response.data['costs'].map((item) => ({
                'time': Number(item.date.slice(0, 2)),
                '지출': Math.floor(item.money / 1000) / 10
            })))
            console.log("profit,expense get succeeded!",
                response.data['profits'], response.data['costs']);
        } catch (error) {
            console.log("ExpenseData get failed ;", error);
        }
    }
    const onChange = (event) => {
        event.preventDefault();
        setDateParams(new Date(event.target.value))
    }

    useEffect(() => {
        console.log('dateParams updated');
        fetchExpense(dateParams)
    },[dateParams]);
    
    useEffect(() => {
        const PL = profitData.length;
        const EL = expenseData.length;
        if (PL > 2 && EL > 2) {
            let i, j;
            i = j = 0;
            console.log('profit,expense check', profitData, expenseData)
            while (i < PL && j < EL) {
                if (profitData[i].time > expenseData[j].time) {
                    datas.push(expenseData[j]);
                    j++;
                } else if (profitData[i].time < expenseData[j].time) {
                    datas.push(profitData[i]);
                    i++;
                } else {
                    datas.push(Object.assign({},    //딕셔너리 합치는 메소드
                        profitData[i], expenseData[j]));
                    i++;
                    j++;
                }
            }
            while (i < PL) {
                datas.push(profitData[i]);
                i++;
            }
            while (j < EL) {
                datas.push(expenseData[j]);
                j++;
            }
        }
    }, [profitData, expenseData])
    
    return (
        <div className={home_account.root}>
            <div
                className={home_account.btn_close}
                onClick={onClick_menu}>
                {modalMenu ? "✕" : "☰"}
            </div>

            <ModalMenu modalMenu={modalMenu} userData={userData}></ModalMenu>

            <main className={home_account.board}>
                <div className={home_account.upper_bar}>
                    <p>비용 분석 리포트</p>
                    <select
                        className={home_account.selection}
                        onChange={onChange}>
                        {dateList.map((item, key) => {
                            return <option
                                key={key}
                                value={item}>
                                {`${Number(item.slice(5, 7))}월 ${item.slice(8, 10)}일`}
                            </option>
                        })}
                    </select>
                </div>
                <div className={home_account.legend_boxes}>
                        <div className={home_account.legend_box}>
                            <div className={home_account.light_brown_icon}></div>
                            <p className>수입 그래프</p>
                        </div>
                        <div className={home_account.legend_box}>
                            <div className={home_account.light_blue_icon}></div>
                            <p className>지출 그래프</p>
                        </div>
                    </div>
                <div className={home_account.graph}>
                    <BarChart data={datas}
                    ></BarChart>
                </div>
            </main>
        </div>
    )
}

export default Home_Account_Analysis;