import hamso_logo from "../images/hamso_logo.svg";

import { Link } from "react-router-dom";

import login from "../css/Log_in.module.css";

function Banner(){
    return <Link to="/" style={{ textDecoration: "none" }}>
        <header className={login.header}>
          <img className={login.logo_img} src={hamso_logo}></img>
          <div className={login.text_box}>
            <p className={login.header_text1}>함소</p>
            <p className={login.header_text2}>온전히 떠나보낼 수 있도록,</p>
          </div>
        </header>
      </Link>
}
export default Banner;