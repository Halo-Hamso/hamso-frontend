import { useState, useEffect } from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import Banner from '../components/Banner';
import Timer from "../components/Timer"

import login from "../css/Log_in.module.css";
import sign_up from '../css/Sign_up.module.css';

import axios from "axios";

import { Link } from "react-router-dom";

import eyeClose from "../images/eyeClose.svg";
import eyeOpen from "../images/eyeOpen.svg";

function Password_Finding() {
  const PHONEURL = "http://3.34.24.140:9998/sms/send";
  const PSWDURL = "http://3.34.24.140:9998/auth/find-pwd";

  const [loading, setLoading] = useState(false);
  const [wrongId, setWrongId] = useState(false);

  const [wrongPswd, setWrongPswd] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(eyeClose);
  const [type, setType] = useState("password");

  const [loginText, setLoginText] = useState("");
  const [textClass, setTextClass] = useState(login.loading);
  const [submit, setSubmit] = useState(false);
  const [clicked, setClicked] = useState(false);



  const [backCode, setBackCode] = useState("");
  const [disInput, setDisInput] = useState(true);
  const [timer, setTimer] = useState(false);
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [codeClass, setCodeClass] = useState(sign_up.input_box3);

  const [formValues, setFormValues] = useState({
    phoneNo: "",
    password: "",
  });

  const [phoneText, setPhoneText] = useState(sign_up.text6);
  const [phoneMessage, setPhoneMessage] = useState("* 올바른 전화번호를 입력해주세요");
  const [codeText, setCodeText] = useState(sign_up.text_none);
  const [disabledBtn1, setDisabledBtn1] = useState(true);
  const [disabledBtn2, setDisabledBtn2] = useState(true);
  const [accessBtn1, setAccessBtn1] = useState(sign_up.btn_x);
  const [accessBtn2, setAccessBtn2] = useState(sign_up.btn_x);

  const [disabledPswd, setDisabledPswd] = useState(true);
  const [returnPwsd, setReturnPwsd] = useState("");
  const [returnPswd_check, setReturnPswd_check] = useState("");
  const [pswd, setPswd] = useState(false);
  const [checkPswd, setCheckPswd] = useState(false);
  const [pswdStr1, setPswdStr1] = useState("※ 영문자+숫자+특수문자 9자리 이상 15자리 이하를 입력하십시오.");
  const [pswdClass1, setPswdClass1] = useState(sign_up.possible);
  const [pswdStr2, setPswdStr2] = useState("");
  const [pswdClass2, setPswdClass2] = useState(sign_up.possible);



  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onClick_phone = async (event) => {
    event.preventDefault();
    setTimer(false);
    const to = formValues.phoneNo;
    const content = "";
    const response = await axios.post(PHONEURL, { to, content });

    console.log(typeof (response.data));
    if (typeof (response.data == 'number')) {
      console.log("요청 성공");
      setDisInput(false);
      setBackCode(response.data);
      setCodeText(sign_up.text6);
      setAccessBtn2(sign_up.btn_o);
      setDisabledBtn2(false);
      setCodeClass(sign_up.input_box3_abled)
      setTimer(true);
    } else {
      console.log(response.data);
    }
  }
  const onClick_phoneCheck = (event) => {
    event.preventDefault();
    console.log(Number(backCode), Number(formValues.code))
    if (Number(backCode) === Number(formValues.code)) {
      alert("인증이 완료되었습니다!");
      setPhoneChecked(true);

      setDisInput(true);
      setCodeText(sign_up.text_none);
      setAccessBtn2(sign_up.btn_x);
      setDisabledBtn2(true);
      setCodeClass(sign_up.input_box3_abled)
      setTimer(false);
      setDisabledPswd(false);
    } else {
      alert("인증번호가 일치하지 않습니다!");
      setDisabledPswd(true);
    }
  }

  const onClick_visible = () => {
    if (!visible) {
      //클릭 당시의 현재값을 기준으로, 조건문에서는 그것을 바꾸고 그 이후의 변화를 살필 것. true일 경우 true의 상황을 제공하는 게 아니라
      //true일 경우에는 false로 바꿔줘야함!!
      setVisible(true);
      setVisibleBtn(eyeOpen);
      setType("text");
    } else {
      setVisible(false);
      setVisibleBtn(eyeClose);
      setType("password");
    }
    console.log(visible);
  };
  const password_check = () => {
    const regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const password = returnPwsd;
    const check_password = returnPswd_check;

    const password_check1 = regPass.test(password);
    const password_check2 = password === check_password;
    const blank1 = password !== "";
    const blank2 = check_password === "";

    if (regPass.test(password)) {
      setPswd(true);
      setCheckPswd(true);
      setPswdClass1(sign_up.text_none);
      setPswdStr1("올바른 비밀번호입니다.");
    } else {
      setPswd(false);
      setCheckPswd(true);
      setPswdClass1(sign_up.impossible);
      setPswdStr1("※ 영문자+숫자+특수문자 9자리 이상 15자리 이하를 입력 하십시오.");
    }

    if (password !== check_password && check_password !== "") {
      setPswd(true);
      setCheckPswd(false);
      setPswdClass2(sign_up.impossible);
      setPswdStr2("※ 작성하신 비밀번호와 일치하지 않습니다.");
    } else {
      setPswdClass2(sign_up.text_none);
    }
  }

  const return_pw = (event) => {
    event.preventDefault();
    onChange(event);
    setReturnPwsd(event.target.value);
  }
  const return_pw_check = (event) => {
    event.preventDefault();
    onChange(event);
    setReturnPswd_check(event.target.value);
  } //이벤트핸들러 함수 안에다가 onChange함수 + event 인자 전달해서
  //이중함수 구현

  const submitNewPassword = async () => {
    const result = window.confirm("입력한 새 비밀번호로 변경하시겠습니까?")

    if (result) {
      const phoneNo = formValues.phoneNo;
      const newPassword = formValues.password;

      console.log('phoneNo,newPassword', phoneNo, newPassword);
      try {
        const response = await axios.post(PSWDURL, { phoneNo, newPassword });
        if(response.data.slice(0,4)==="비밀번호"){
          console.log(response.data);
          alert(response.data);
          window.location.href = '/';
        }else{
          alert(response.data);
        }
      } catch (error) {
        console.log("password changing failed", error);
      }
    }
  };

  useEffect(() => { password_check() }, [returnPwsd, returnPswd_check]);
  useEffect(() => {
    const regex = /^[0-9\-]*$/;
    if (!regex.test(formValues.phoneNo)) {
      setPhoneText(sign_up.text6);
      setPhoneMessage("* 숫자만 입력 가능합니다");
      setAccessBtn1(sign_up.btn_x);
      setDisabledBtn1(true);
    } else if (formValues.phoneNo.length === 11) {
      setPhoneText(sign_up.text_none);
      setAccessBtn1(sign_up.btn_o);
      setDisabledBtn1(false);
    } else {
      setPhoneText(sign_up.text6);
      setAccessBtn1(sign_up.btn_x);
      setDisabledBtn1(true);
    }
  }, [...Object.values(formValues)])


  return (
    <div className={login.root}>

      <Banner></Banner>

      <main className={sign_up.main}>
      <p className={login.family_log_in_back}>
          ◀︎&nbsp;
          <Link to='/'
            style={{
              textDecoration: 'none',
              color: '#493B39'
            }}>
            로그인 페이지
          </Link>
          </p>

        <div className={login.flex_center}>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ marginBottom: '4px' }}
              className={sign_up.text1}>전화번호</p>
            <div style={{ marginBottom: '4px' }}
              className={sign_up.input_btn1}>
              <div className={sign_up.input_box_phone}>
                <Input name="phoneNo" type="text"
                  onChange={onChange}
                  value={formValues.phoneNo}
                  placeholder="'-'없이 입력해주십시오"
                  className={sign_up.input2} />
              </div>
              <Button onClick={onClick_phone} type="button"
                disabled={disabledBtn1}
                text="인증요청" className={accessBtn1} />
            </div>
            <p className={phoneText}>{phoneMessage}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <p style={{ marginBottom: '4px' }}
              className={sign_up.text1}>인증번호</p>
            <div style={{ marginBottom: '4px' }}
              className={sign_up.input_btn1}>
              <div className={codeClass}>
                <Input name="code" type="number" disabled={disInput}
                  onChange={onChange} placeholder="인증번호를 입력해주세요."
                  className={sign_up.input2} />
                {timer &&
                  <Timer limitTime={180}
                    className={sign_up.timer}
                    setTimer={setTimer}></Timer>}

              </div>

              <Button onClick={onClick_phoneCheck} type="button" disabled={disabledBtn2}
                text="인증확인" className={accessBtn2} />
            </div>
            <p className={codeText}>* 인증번호를 입력해주세요</p>
          </div>



          <div style={{ marginBottom: "40px" }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <p className={sign_up.text1}>새 비밀번호</p>
                <div style={{ marginBottom: '4px' }}
                  className={
                    disabledPswd ? sign_up.input_box2_disabled
                      : sign_up.input_box2}>
                  <Input name="password" type={type}
                    onChange={return_pw}
                    placeholder={
                      disabledPswd ? "인증을 완료한 뒤 입력하실 수 있습니다"
                        : "●●●●●●●●"}
                    className={sign_up.input1}
                    disabled={disabledPswd} />
                  <img src={visibleBtn} onClick={onClick_visible}></img>
                </div>
                <p className={pswdClass1}>{pswdStr1}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <p className={sign_up.text1}>새 비밀번호 확인</p>
                <div className={
                  disabledPswd ? sign_up.input_box2_disabled
                    : sign_up.input_box2}>
                  <Input name="check_pswd" type="password" onChange={return_pw_check}
                    placeholder={
                      disabledPswd ? "인증을 완료한 뒤 입력하실 수 있습니다"
                        : "새 비밀번호를 한번 더 입력해주십시오"}
                    className={sign_up.input1}
                    disabled={disabledPswd} />
                </div>
                <p className={pswdClass2}>{pswdStr2}</p>
              </div>
            </div>
          </div>
          <Button
            style={{ marginBottom: "4px" }}
            text="비밀번호 변경하기"
            className={login.submit_btn}
            onClick={submitNewPassword}
          ></Button>
        </div>

        
      </main>
    </div>
  );
}

export default Password_Finding;


//임시 확인용 계정
//01011112222
//1234
