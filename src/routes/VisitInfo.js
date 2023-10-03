import hamso_logo from "../images/hamso_logo_visit.svg";
import sign_up from "../css/Sign_up.module.css";
import visitStyle from "../css/visitStyle.module.css";
import visit_back from "../images/visit_back.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { visitInfoApi } from "../Apis/CustomApis";
function VisitInfo() {
  const [visitInfo, setVisitInfo] = useState({
    name: "",
    belong: "",
    bereavedFamilyName: "",
    relation: "",
    CondolenceAmount: "",
  });

  const handleVisitInfo = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setVisitInfo({ ...visitInfo, [id]: value });
  };

  const handleSubmitBtn = () => {
    visitInfoApi(visitInfo)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  console.log(visitInfo);
  return (
    <div>
      <div className={visitStyle.visitInfoBox}>
        <div className={visitStyle.logoBox}>
          <Link to="/">
            <img src={visit_back}></img>
          </Link>
          <div className={visitStyle.imgBackground}>
            <img src={hamso_logo} className={sign_up.logo_img}></img>
            <div style={{ marginLeft: "14px" }}>
              <p className={visitStyle.hamsoText}>함소</p>
              <p className={visitStyle.hamsoUnderText}>
                온전히 떠나보낼 수 있도록
              </p>
            </div>
          </div>
        </div>
        <div className={visitStyle.text}>
          <p>조문객님의 정보를 입력해주세요</p>
          <p style={{ marginTop: "30px" }}>
            1분으로 유족분들에게 큰 힘이 됩니다.
          </p>
        </div>
        <div>
          <div className={visitStyle.inputTitle}>이름</div>
          <input
            id="name"
            onChange={handleVisitInfo}
            className={visitStyle.inputBox}
            placeholder="김함소"
          ></input>

          <div className={visitStyle.inputTitle}>소속</div>
          <input
            id="belong"
            onChange={handleVisitInfo}
            className={visitStyle.inputBox}
            placeholder="세종대학교"
          ></input>

          <div className={visitStyle.inputTitle}>방문한 유족 성함</div>
          <input
            id="bereavedFamilyName"
            onChange={handleVisitInfo}
            className={visitStyle.inputBox}
            placeholder="김태운"
          ></input>

          <div className={visitStyle.inputTitle}>유족과의 관계</div>
          <select
            id="relation"
            onChange={handleVisitInfo}
            className={visitStyle.smallInputBox}
          >
            <option value="1">친구</option>
            <option value="2">직장 동료</option>
            <option value="3">지인</option>
            <option value="4">친척</option>
            <option value="5">직접 입력</option>
          </select>
          <input
            id="relation"
            onChange={handleVisitInfo}
            style={{ marginLeft: "30px" }}
            className={visitStyle.smallInputBox}
            placeholder="직접 입력"
          ></input>
          <div className={visitStyle.inputTitle}>부의금액</div>
          <input
            id="CondolenceAmount"
            onChange={handleVisitInfo}
            className={visitStyle.smallInputBox}
            placeholder="50000"
          ></input>
          <span
            className={visitStyle.smallInputBox}
            style={{ border: "0px", marginLeft: "8px", paddingLeft: "0px" }}
          >
            원
          </span>
        </div>
        <button onClick={handleSubmitBtn} className={visitStyle.submitBtn}>
          제출하기
        </button>
      </div>
    </div>
  );
}

export default VisitInfo;
