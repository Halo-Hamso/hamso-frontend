import { useState, useEffect } from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import Banner from '../components/Banner';

import login from "../css/Log_in.module.css";

import axios from "axios";

import { Link } from "react-router-dom";

import hamso_logo from "../images/hamso_logo.svg";
import eyeClose from "../images/eyeClose.svg";
import eyeOpen from "../images/eyeOpen.svg";

function Log_in_family() {
  const LOGINURL = "http://3.34.24.140:9998/auth/login";

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

  const [formValues, setFormValues] = useState({
    phoneNo: "",
    password: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

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

  const submitLogin = async () => {
    setLoading(true);
    setLoginText("로그인 중입니다...");
    setTextClass(login.loading);
    setWrongId(false);
    setWrongPswd(false);

    const phoneNo = formValues.phoneNo;
    const password = formValues.password;

    console.log('phoneNo,password',phoneNo,password);
    try {
      const response = await axios.post(LOGINURL, { phoneNo, password });

      const userData = {
        phoneNo: response.data.phoneNo,
        name: response.data.name,
        token: response.data.token,
      };
      sessionStorage.setItem("userData", JSON.stringify(userData));
      window.location.href='/home_account_analysis';

    } catch (error) {
      console.log("login failed", error);
      setLoading(false);
      setLoginText("존재하지 않는 회원이거나 비밀번호가 일치하지 않습니다!");
      setTextClass(login.wrong);
    }
  };
  const onSubmit = (event) => {
    event.preventDefault();
    //form태그의 버튼태그가 새로고침하는 걸 막아줌
    setSubmit((prev) => !prev);
    setClicked(true);
  };

  useEffect(() => {
    submitLogin();
    console.log("clicked,submit",clicked,submit);
  }, [submit]);

  return (
    <div className={login.root}>
      <Banner></Banner>
      <main className={login.main}>
        <form onSubmit={onSubmit} className={login.flex_center}>
          <div style={{ marginBottom: "12px" }}>
            <p className={login.text1_head} style={{ marginBottom: "4px" }}>
              전화번호(아이디)
            </p>
            <div className={login.input_box1}>
              <Input
                name="phoneNo"
                type="text"
                onChange={onChange}
                placeholder="전화번호(아이디)"
                className={login.input1}
              ></Input>
            </div>
          </div>
          <div style={{ marginBottom: "40px" }}>
            <p className={login.text1} style={{ marginBottom: "4px" }}>
              비밀번호
            </p>
            <div className={login.input_box2}>
              <Input
                name="password"
                type={type}
                onChange={onChange}
                placeholder="●●●●●●●●●●"
                className={login.input2}
              ></Input>
              <img src={visibleBtn} onClick={onClick_visible}></img>
            </div>
            {clicked && <div className={textClass}>{loginText}</div>}
          </div>
          <Button
            style={{ marginBottom: "4px" }}
            text="로그인하기"
            className={login.submit_btn}
            type='submit'
          ></Button>
          <p style={{ color: "#999", fontSize: "12px", marginBottom: "20px" }}>
            비밀번호를 잊으셨나요? &nbsp;
            <Link
              to="/password_finding"
              style={{ color: "#999", fontSize: "12px" }}
            >
              <a>비밀번호 변경</a>
            </Link>
          </p>
        </form>

        <Link to="/Sign_up_select">
          <Button text="회원가입하기" className={login.sign_up}></Button>
        </Link>
        <p className={login.business_log_in}>
          비즈니스 회원이신가요? &nbsp;
        <Link to='/log_in_business'
        style={{
          textDecoration:'underline',
          color:'#374649'
        }}>
        비즈니스회원 로그인
        </Link>
        ▶︎ </p>
      </main>
    </div>
  );
}

export default Log_in_family;


//임시 확인용 계정
//01011112222
//1234
