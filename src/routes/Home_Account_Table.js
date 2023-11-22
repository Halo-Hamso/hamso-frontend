import { useState, useEffect } from "react";

import ModalMenu from "../components/ModalMenu";

import Button from '../components/Button';

import home_account from "../css/Home_Account.module.css";

import glasses from "../images/glasses.svg"

import axios from 'axios'

function Home_Account_Table() {
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



    const [modalMenu, setModalMenu] = useState(false);
    const [accountList, setAccountList] = useState({});
    const [size, setSize] = useState(10);
    const [pageInfo, setPageInfo] = useState({});
    const [totalMoney, setTotalMoney] = useState(0);
    const [currentNum, setCurrentNum] = useState(1);
    const [numList, setNumList] = useState([]);
    const [showTable, setShowTable] = useState(false);
    const [searchKey, setSearchKey] = useState("");

    const onClick_menu = () => {
        setModalMenu(!modalMenu);
    }
    const onChange = (event) => {
        event.preventDefault();
        setSearchKey(event.target.value);
    }
    const fetchAccount = async (size) => {
        const accountURL = `http://3.34.24.140:9998/account-book/1`;
        //id가 phoneNo

        console.log('accountURL:', accountURL);
        console.log('Token:', userData.token)
        try {
            const response = await axios.get(accountURL,
                {
                    params:
                    {
                        page: currentNum - 1,
                        size: size,
                    },
                    headers: {
                        'Authorization': `Bearer ${userData.token}`,
                        withCredentials: true,
                    }
                });
            console.log("accountList fetch succeeded!",
                response.data.accountList,
                response.data.pageInfo);

            setAccountList(response.data.accountList);
            setPageInfo(response.data.pageInfo);
            setTotalMoney(response.data.totalMoney);
            setShowTable(true);
        } catch (error) {
            console.log("accountList fetch failed ;", error);
        }
    }

    const onClick_search = async (event) => {
        event.preventDefault();
        const accountURL = `http://3.34.24.140:9998/account-book/1`;
        const searchKeyword = searchKey;

        console.log('accountURL:', accountURL);
        console.log('Token:', userData.token)
        console.log('searchKeyword',searchKeyword);
        try {
            const response = await axios.get(accountURL,
                {
                    params:
                    {
                        page: currentNum - 1,
                        size: size,
                        searchKeyword: searchKeyword
                    },
                    headers: {
                        'Authorization': `Bearer ${userData.token}`,
                        withCredentials: true,
                    }
                });
            console.log("accountList fetch succeeded!",
                response.data.accountList,
                response.data.pageInfo);

            setAccountList(response.data.accountList);
            setPageInfo(response.data.pageInfo);
            setShowTable(true);
        } catch (error) {
            console.log("accountList fetch failed ;", error);
        }
    }

    const onClick_index = (event) => {
        event.preventDefault();
        setCurrentNum(Number(event.target.value));
    }



    useEffect(() => { fetchAccount(size) }, [userData.phoneNo, currentNum])
    useEffect(() => {
        if (numList.length < pageInfo.totalPages)
            for (let i = 0; i < pageInfo.totalPages; i++)
                numList.push(i + 1);


        console.log('accountList', accountList);
        console.log('numList:', numList);
    }, [pageInfo.totalPages])
    //표 밑 페이지수 기호 업데이트


    return (
        <div className={home_account.root}>
            <div
                className={home_account.btn_close}
                onClick={onClick_menu}>
                {modalMenu ? "✕" : "☰"}
            </div>
            <ModalMenu
                modalMenu={modalMenu}
                userData={userData}></ModalMenu>

            <main className={home_account.mainboard}>
                <div className={home_account.board}>
                    <div>
                        <p className={home_account.text_account}>부의금 가계부</p>
                        <p className={home_account.text_update}>업데이트 : {(new Date()).toLocaleString()} </p>
                        {/* 시간을 문자열로 바로 반환해주는 메소드 */}
                    </div>
                    <div className={home_account.flexbox_row}
                        style={{ width: '100%', justifyContent: 'space-between' }}>
                        <div className={home_account.searchBox}>
                            <img src={glasses} onClick={fetchAccount}></img>
                            <input
                                className={home_account.searchInput}
                                onChange={onChange}
                                placeholder="검색내용 (ex, 신혜영, 헤일로컴퍼니...)">
                            </input>
                            <button className={home_account.btn_search}
                            onClick={onClick_search}>검색</button>
                        </div>

                        {/* <select>
                            <option>
                                정렬순
                            </option>
                        </select> */}
                    </div>
                    {showTable ? (
                        <div className={home_account.table_box}>
                            <div style={{
                                marginBottom: '4px',
                                alignSelf: 'flex-end',
                                fontSize: '16px',
                            }}>* 최신순 정렬</div>
                            <table className={home_account.table}>
                                <thead className={home_account.table_head}>
                                    <tr>
                                        <td>/</td>
                                        <td>조문객 성함</td>
                                        <td>소속</td>
                                        <td>방문한 유족</td>
                                        <td>유족과의 관계</td>
                                        <td>부의금</td>
                                    </tr>
                                </thead>
                                {/* <tbody>
                            <tr>
                                <td>#0004</td>
                                <td>신혜영</td>
                                <td>헤일로컴퍼니</td>
                                <td>김태운</td>
                                <td>직장 상사</td>
                                <td>200,000원</td>
                            </tr>
                        </tbody> */}
                                <tbody>
                                    {accountList.map(
                                        (item, key) => {
                                            return <tr key={key}>
                                                <td>#{(key + 1).toString().padStart(3, '0')}</td>
                                                <td>{item.name}</td>
                                                <td>{item.visitedTo}</td>
                                                <td>{item.team}</td>
                                                <td>{item.relation}</td>
                                                <td>{item.money.toLocaleString()}원</td>
                                            </tr>
                                        })

                                    }
                                </tbody>
                            </table>

                            <div className={home_account.flexbox_row} 
                            style={{ width: '100%',
                            marginBottom:'8px'}}>
                                <div className={home_account.total_money}>부의금 총액</div>
                                <div className={home_account.total_money}>{totalMoney.toLocaleString()}원</div>
                            </div>

                            <div className={home_account.index}>
                                {numList.map(
                                    (item, index) => {
                                        if (index + 1 === currentNum) {
                                            return <Button key={index}
                                                className={home_account.clicked_index}
                                                onClick={onClick_index}
                                                text={item}
                                                value={index + 1}>
                                            </Button>
                                        } else {
                                            return <Button key={index}
                                                className={home_account.unclicked_index}
                                                onClick={onClick_index}
                                                text={item}
                                                value={index + 1}>
                                            </Button>
                                        }
                                    })}
                            </div>
                            <div style={{
                                alignSelf: 'flex-start',
                                fontSize: '16px'
                            }}>
                                총 {pageInfo.totalNumber}건</div>
                        </div>)
                        : <div className={home_account.bar_blank}>
                            관련 데이터를 찾지 못했습니다.
                        </div>
                    }

                </div>
            </main>
        </div>
    )
}

export default Home_Account_Table;