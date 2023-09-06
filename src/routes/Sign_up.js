import { useState, useEffect } from "react";

import Button from "../components/Button";
import Input from "../components/Input";
import PhoneCode from "../components/PhoneCode";

import axios from 'axios'

function Sign_up() {

  const LISTURL = "#"
  const JOINURL = "#";
  const DUPLURL = '#';

  const storedPhoneNumberData = JSON.parse(sessionStorage.getItem('phoneNumberData'));

  const [fixedId, setfixedId] = useState("");
  const [idImg, setIdImg] = useState(check_x);
  const [dupl, setDupl] = useState(false);

  const [returnPwsd, setReturnPwsd] = useState("");
  const [returnPswd_check, setReturnPswd_check] = useState("");
  const [pswd, setPswd] = useState(false);
  const [checkPswd, setCheckPswd] = useState(false);
  const [pswdStr, setPswdStr] = useState("※ 영문자+숫자+특수문자 9자리 이상 15자리 이하를 입력 하십시오.");
  const [pswdClass, setPswdClass] = useState(sign_up.possible);

  const [type, setType] = useState("password");
  const [lock, setLock] = useState(true);
  const [lockBtn, setLockBtn] = useState(locked);

  const [joinbtn, setJoinBtn] = useState(true);
  const [psbClass, setPsbClass] = useState(sign_up.possible);
  const [btnClass, setBtnClass] = useState(sign_up.next_btn_x);
  const [duplMessage, setDuplMessage] = useState("");
  const [postItem, setPostItem] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    pswd: "",
    check_pswd: "",
    email: "",
    address: "",
    specific_address: "",
    phoneNo: storedPhoneNumberData.PhoneNumber
  });


  const onChange = (event) => {
    const { name, value } = event.target; //속성 중 name,value만 골라서 넣어줌
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value   //수정 및 추가기능 둘 다 수행
    }));
  };
  //return없이 반환값 쓸려면 {}넣으면 안 됨
  //객체 수정하는 useState 방식

  // const onClick_ID = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const loginId = event.target.ID.value;
  //     const response = await axios.get(DUPLURL, { params: { loginId } })
  //     const responseData = response.data;


  //     console.log("Possible! No Duplication!");
  //     setDuplMessage("사용 가능한 ID입니다");
  //     setDupl(true);
  //     setfixedId(loginId);
  //     setIdImg(check_o);
  //     setPsbClass(sign_up.possible);
  //     setFormValues((prevValues) => ({
  //       ...prevValues,
  //       ID: loginId
  //     }));
  //   }
  //   catch (error) {       //res.status(404).json(data) 이런식으로 백엔드에서 보내줌
  //     console.log(error.response.data.message); //error을 통해 response.data.message에 접근 가능
  //     setDuplMessage("중복사용된 ID입니다");
  //     setDupl(false);
  //     setIdImg(check_x);
  //     setPsbClass(sign_up.impossible);
  //   }
  // }

  const return_pw = (event) => {
    event.preventDefault();
    onChange(event);
    setReturnPwsd(event.target.value);
  }
  const return_pw_check = (event) => {
    event.preventDefault();
    onChange(event);
    setReturnPswd_check(event.target.value);
  }

  const password_check = () => {
    const regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;
    const password = returnPwsd;
    const check_password = returnPswd_check;

    const password_check1 = regPass.test(password);
    const password_check2 = password === check_password;
    const blank1 = password !== "";
    const blank2 = check_password === "";

    if (regPass.test(password)
      && (password === check_password || check_password === "")) {
      setPswd(true);
      setCheckPswd(true);
      setPswdClass(sign_up.possible);
      setPswdStr("올바른 비밀번호입니다.");
    } else if
      (!regPass.test(password) && (password !== "" || check_password === "")) {
      setPswd(false);
      setCheckPswd(true);
      setPswdClass(sign_up.impossible);
      setPswdStr("※ 영문자+숫자+특수문자 9자리 이상 15자리 이하를 입력 하십시오.");
    } else if (password !== check_password && check_password !== "") {
      setPswd(true);
      setCheckPswd(false);
      setPswdClass(sign_up.impossible);
      setPswdStr("※ 작성하신 비밀번호와 일치하지 않습니다.");
    }
  }

  const onClick_locker = () => {
    setLock(!lock);

    if (lock) {
      setLockBtn(opened);
      setType("text");
    } else {
      setLockBtn(locked);
      setType("password");
    }
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const loginId = fixedId;
    const name = event.target.name.value;
    const password = event.target.pswd.value;
    const phoneNo =
      `${storedPhoneNumberData.PhoneNumber.slice(0, 3)}${storedPhoneNumberData.PhoneNumber.slice(3, 7)}${storedPhoneNumberData.PhoneNumber.slice(7, 11)}`
    const email = event.target.email.value;
    const address = postItem;
    const specificAddress = event.target.specific_address.value;

    console.log(loginId, name, password, phoneNo, email, address, specificAddress);

    const response = await axios.post(JOINURL, {
      loginId, password, name, phoneNo, email, address, specificAddress
    });

    console.log('반환받아랏', response.data);

    if (response.data) {
      console.log("sign_up succceed!");
      window.location.href = "/sign_up_success";
    }
  }


  useEffect(password_check, [returnPwsd, returnPswd_check]);
  useEffect(() => {
    const allInputsFilled = Object.values(formValues).every((value) => value !== "");
    console.log(allInputsFilled);
    console.log(formValues)
    if (allInputsFilled && dupl && pswd && checkPswd) {
      setJoinBtn(false);
      setBtnClass(sign_up.next_btn_o);

    } else {
      setJoinBtn(true);
      setBtnClass(sign_up.next_btn_x);
    }
  }, Object.values(formValues))
  //Object : 객체에 대한 함수 라이브러리 => .values : value값들을 배열화

  const agree_text=[
    '(예시) 실명 인증된 아이디로 가입, 위치기반서비스 이용약관(선택), 이벤트 • 혜택 정보 수신(선택) 동의를 포함합니다.',
    '(예시) 함소 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 함소 서비스의 이용과 관련하여 함소 서비스를 제공하는 함소와 이를 이용하는 함소 서비스 회원(이하 회원) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 함소소 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.',
    '(예시) 함소 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 함소 서비스의 이용과 관련하여 함소 서비스를 제공하는 함소와 이를 이용하는 함소 서비스 회원(이하 회원) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 함소 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.'
  ]

  return (
    <div className={divStyles.sign_up_back}>
      <header>
        <img src={hamso_logo}></img>
        <div>
          <p>함소</p>
          <p>온전히 떠나보낼 수 있도록,</p>
        </div>
      </header>

      <main className="Sign_up-main">

        <div className="Sign_up-tag0">
          <p className="Sign_up_font0">
            회원가입을 위해 정보를 입력해주세요.
          </p>
        </div>

        <form action="">
          <div>
            <p>이름</p>
            <Input name="name" type="text" onChange={onChange} placeholder="이름을 입력해주세요."
              className='Sign_up-input1' />
          </div>

          <div>
            <p>전화번호</p>
            <div>
              <Input name="tel" type="number" onChange={onChange} placeholder="010-XXXX-XXXX"
                className='Sign_up-input2' />
              <Button onClick={onClick} type="button"
                text="인증요청" className='Sign_up-button1' />
            </div>
          </div>

          <div>
            <div>
              <p>인증번호</p>
              <Input id="code" type="number" onChange={onChange} placeholder="인증번호를 입력해주세요."
                className='Sign_up-input2' />
            </div>
            <Button onClick={onClick} type="button"
              text="인증확인" className='Sign_up-button1' />
          </div>


          <div>
            <p>비밀번호</p>
            <Input name="pswd" type="password" onChange={onChange} placeholder="··········"
              className='Sign_up-input1' />
          </div>

          <div>
            <p>비밀번호 확인</p>
            <Input name="check_pswd" type="password" onChange={onChange}
              placeholder="비밀번호를 한번 더 입력해주세요."
              className='Sign_up-input1' />
          </div>

          <div><p>유족과의 관계</p>
          <select name="relationship" className='Sign_up-input3'>
            <option value="father" >아버지(父)</option>
            <option value="mother">어머니(母)</option>
            <option value="son">아들(子)</option>
            <option value="daughter">딸(女)</option>
            <option value="etc">기타</option>
          </select></div>

          <div>
          <div>
            <Input id="code" type="checkbox" checked={allChecked} onChange={handleAllChecked} />
            <p>전체 동의하기</p>
            </div>
          <div className='Sign_up-terms_all'>
            {agree_text[0]}
          </div>
          </div>

          <div>
          <div>
            <Input id="code" type="checkbox" checked={allChecked} onChange={handleAllChecked} />
            <p><a>[필수]</a>함소 이용약관</p>
            </div>
          <div className='Sign_up-terms_all'>
            {agree_text[1]}
          </div>
          </div>

          <div>
          <div>
            <Input id="code" type="checkbox" checked={allChecked} onChange={handleAllChecked} />
            <p><a>[선택]</a>함소 이용약관</p>
            </div>
          <div className='Sign_up-terms_all'>
            {agree_text[2]}
          </div>
          </div>

        <Button text="가입하기" onClick={onClick}></Button>
        </form>
      </main>
    </div>
  )
};


export default Sign_up;
