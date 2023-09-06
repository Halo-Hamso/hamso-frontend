import { useState, useEffect } from "react";

import Button from "../components/Button";
import Input from "../components/Input";

import axios from 'axios'

import { Link } from "react-router-dom";

import hamso_logo from "../images/hamso_logo.svg";


function Log_in() {
  const LOGINURL = "#"

  const [loading,setLoading]=useState(false);
  const [wrongId,setWrongId]=useState(false);
  const [wrongPswd,setWrongPswd]=useState(false);
  const [loginText,setLoginText]=useState("");
  const [textClass,setTextClass]=useState(login.loading);
  const [submit,setSubmit]=useState(false);
  const [clicked,setClicked]=useState(false);

  const [formValues, setFormValues] = useState({
    id: "",
    pswd: ""
  })

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))
  }

  
  const submitLogin = async () => {
    setLoading(true);
    setLoginText("로그인 중입니다...")
    setTextClass(login.loading)
    setWrongId(false);
    setWrongPswd(false);

    const loginID = formValues.id;
    const password = formValues.pswd;

    try {
      const response = await axios.post(LOGINURL, { loginID, password });

      const tokenData = {
        grantType: response.data.grantType,
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken
      }
      sessionStorage.setItem('tokenData', JSON.stringify(tokenData));
      
      try{
        const storedTokenData = JSON.parse(sessionStorage.getItem('tokenData'));
        const response_member=await axios.get(MEMBERURL,{
          headers:{
            'Authorization':`Bearer ${storedTokenData.accessToken}`
          }
        })

        const userData={
          loginId:response_member.data.loginId,
          password:response_member.data.password,
          name : response_member.data.name,
          phoneNo:response_member.data.phoneNo,
          email:response_member.data.email,
          address:response_member.data.address,
          specificAddress:response_member.data.specificAddress
        }
        sessionStorage.setItem('userData',JSON.stringify(userData));

        if(userData.loginId === 'auth_id'){
          location.href="/auth_home"
        }
        else{
          location.href="/"
        }
      }catch(error){
        console.log('get response_member failed!',error)
      }
  }catch(error){
    console.log('login failed',error)
    setLoading(false);
    setLoginText("아이디 또는 비밀번호가 일치하지 않습니다!");
    setTextClass(login.wrong);
    if(error.response.status==404){
      setWrongId(true);
      console.log('Id wrong')
    }else if(error.response.status==401){
      setWrongPswd(true);
      console.log('Password wrong');
    }
  }
}
const onSubmit = () => {
  setSubmit((prev)=>(!prev));
  setClicked(true);
}
useEffect(submitLogin,[submit]);


return (
  <div>
    <header>
      <img src={hamso_logo}></img>
      <div>
        <p>함소</p>
        <p>온전히 떠나보낼 수 있도록,</p>
      </div>
    </header>
    <main>
      <form onSubmit={onSubmit}>
        <div>
          <p>전화번호(아이디)</p>
          <Input name="id" type="text" onChange={onChange}></Input>
        </div>
        <div>
          <p>비밀번호</p>
          <Input name="pswd" type="password" onChange={onChange}></Input>
        </div>
        {clicked&&<div className={textClass}>{loginText}</div>}
        <Button text="로그인하기"></Button>
        <p>비밀번호를 잊으셨나요? 
          <Link to ='/password_finding'><a>비밀번호 찾기</a></Link>
          </p>
      </form>

      <Link to='/Log_in'>
        <Button text="회원가입하기"></Button>
      </Link>
    </main>
  </div>
)
};


export default Log_in;
