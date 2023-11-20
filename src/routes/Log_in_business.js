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

function Log_in_business() {
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
    businessId: "",
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

  //로그인 버튼 클릭시(axios)
  const submitLogin = async () => {
    setLoading(true);
    setLoginText("로그인 중입니다...");
    setTextClass(login.loading);
    setWrongId(false);
    setWrongPswd(false);

    const businessId = formValues.businessId;
    const password = formValues.password;

    console.log('businessId,password',businessId,password);
    try {
      const response = await axios.post(LOGINURL, { businessId, password });

      const userData = {
        name: response.data.name,
        phoneNo:response.data.phoneNo,
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
      <main className={login.main_business}>
        <form onSubmit={onSubmit} className={login.flex_center}>
          <div style={{ marginBottom: "12px" }}>
            <p className={login.text1_head} style={{ marginBottom: "4px" }}>
              ID(비즈니스회원 전용)
            </p>
            <div className={login.input_box1}>
              <Input
                name="businessId"
                type="text"
                onChange={onChange}
                placeholder="아이디를 입력해주십시오"
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
            className={login.submit_btn_business}
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
          <Button text="회원가입하기" className={login.sign_up_business}></Button>
        </Link>

        <p className={login.family_log_in}>
          유족분이신가요? &nbsp;
        <Link to='/'
        style={{
          textDecoration:'underline',
          color:'#2c2322'
        }}>
        유족회원 로그인
        </Link>
        ▶︎ </p>
      </main>
    </div>
  );
}

export default Log_in_business;
