import { useState, useEffect } from "react";

import Button from "../components/Button";
import Input from "../components/Input";

import login from "../css/Log_in.module.css";

import axios from "axios";

import { Link } from "react-router-dom";

import hamso_logo from "../images/hamso_logo.svg";
import eyeClose from "../images/eyeClose.svg";
import eyeOpen from "../images/eyeOpen.svg";

function Log_in() {
  const LOGINURL = "#";
  const MEMBERURL = "#";

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
    const password = formValues.pswd;

    try {
      const response = await axios.post(LOGINURL, { phoneNo, password });

      const tokenData = {
        grantType: response.data.grantType,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      };
      sessionStorage.setItem("tokenData", JSON.stringify(tokenData));

      try {
        const storedTokenData = JSON.parse(sessionStorage.getItem("tokenData"));
        const response_member = await axios.get(MEMBERURL, {
          headers: {
            Authorization: `Bearer ${storedTokenData.accessToken}`,
          },
        });

        const userData = {
          phoneNo: response_member.data.phoneNo,
          password: response_member.data.password,
          name: response_member.data.name,
          realtionship: response_member.data.realtionship,
        };
        sessionStorage.setItem("userData", JSON.stringify(userData));

        if (userData.phoneNo === "auth_phoneNo") {
          window.location.href = "/auth_home";
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        console.log("get response_member failed!", error);
      }
    } catch (error) {
      console.log("login failed", error);
      setLoading(false);
      setLoginText("아이디 또는 비밀번호가 일치하지 않습니다!");
      setTextClass(login.wrong);
      if (error.response.status == 404) {
        console.log("Id wrong");
      } else if (error.response.status == 401) {
        console.log("Password wrong");
      }
    }
  };
  const onSubmit = () => {
    setSubmit((prev) => !prev);
    setClicked(true);
  };
  useEffect(() => {
    submitLogin();
  }, [submit]);

  return (
    <div className={login.root}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <header className={login.header}>
          <img className={login.logo_img} src={hamso_logo}></img>
          <div className={login.text_box}>
            <p className={login.text1}>함소</p>
            <p className={login.text2}>온전히 떠나보낼 수 있도록,</p>
          </div>
        </header>
      </Link>
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
          </div>
          {clicked && <div className={textClass}>{loginText}</div>}
          <Button
            style={{ marginBottom: "4px" }}
            text="로그인하기"
            className={login.submit_btn}
          ></Button>
          <p style={{ color: "#999", fontSize: "12px", marginBottom: "20px" }}>
            비밀번호를 잊으셨나요? &nbsp;
            <Link
              to="/password_finding"
              style={{ color: "#999", fontSize: "12px" }}
            >
              <a>비밀번호 찾기</a>
            </Link>
          </p>
        </form>

        <Link to="/Sign_up">
          <Button text="회원가입하기" className={login.sign_up}></Button>
        </Link>
      </main>
    </div>
  );
}

export default Log_in;
