import { useState, useEffect } from "react";

import ModalMenu from '../components/ModalMenu';

import home_account from "../css/Home_Account.module.css";

import UserHomeNav from '../components/UserHome/Nav/UserHomeNav';
import PaymentUseItem from '../components/PaymentDetail/PaymentUseItem';
import PaymentItem from '../components/PaymentDetail/paymentItem';
import PaymentNav from '../components/PaymentDetail/paymentNav';
import SelectPopup from '../components/PaymentDetail/SelectPopup';

function Home_Account_Payment() {
    //로그인 여부 확인 (시작)//
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
        }
    }
    useEffect(login_check, []);
    //로그인 여부 확인 (끝)//

    const [popup, setPopup] = useState(false);
    const [type, setType] = useState('item');

    const [modalMenu, setModalMenu] = useState(false);


    const onClick_menu = () => {
        setModalMenu(!modalMenu);
    }

    return (
        <div className={home_account.root}>
            <div
                className={home_account.btn_close}
                onClick={onClick_menu}>
                {modalMenu ? "✕" : "☰"}
            </div>

            <ModalMenu modalMenu={modalMenu} userData={userData}></ModalMenu>

            <main className={home_account.board}>
                <p className={home_account.text_payment}>실시간 용품 관리</p>
                <div className={home_account.table_payment}>
                    <div onClick={() => setPopup(true)}>
                        <PaymentNav type={type} />
                    </div>
                    {type == 'userItem' ? <PaymentUseItem /> : <PaymentItem />}

                    {popup ? (
                        <SelectPopup setType={setType} setPopup={setPopup} type={type} />
                    ) : (
                        ''
                    )}
                </div>
            </main>
        </div>
    )
}

export default Home_Account_Payment;