import sign_up from '../css/Sign_up.module.css';
import hamso_logo from '../images/hamso_logo.svg';
import visitStyle from '../css/visitStyle.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { visitInfoApi } from '../Apis/CustomApis';
import directionDown from '../images/directionDown.svg';

function VisitInfo() {
  const [selected, setSelected] = useState(false);
  const [directInput, setDirectInput] = useState(true);
  const [selectInfo, setSelectInfo] = useState('유족 관계 선택');
  const [visitInfo, setVisitInfo] = useState({
    memberId: '1',
    name: '',
    team: '',
    visitedTo: '',
    relation: '유족 관계 선택',
    money: '',
  });
  const navigate = useNavigate();
  const handleDirectInfo = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setVisitInfo({ ...visitInfo, [id]: value });
  };
  const handleVisitInfo = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const name = e.target.name;

    if (id == 'relation') setSelected(!selected);
    else if ((id == 'relation') & (name != 'true')) {
      setDirectInput(true);
    }
    console.log(directInput);
    setVisitInfo({ ...visitInfo, [id]: value });
  };
  console.log(visitInfo);
  const handleSubmitBtn = () => {
    visitInfoApi(visitInfo)
      .then((res) => {
        console.log(res);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className={visitStyle.visitInfoBox}>
        <div className={visitStyle.logoBox}>
          <div className={visitStyle.imgBackground}>
            <img
              src={hamso_logo}
              className={sign_up.logo_img}
              style={{ marginLeft: '40px', marginRight: '-25px' }}
            ></img>
            <div style={{ marginLeft: '14px' }}>
              <p className={visitStyle.hamsoText}>함소</p>
              <p className={visitStyle.hamsoUnderText}>
                온전히 떠나보낼 수 있도록
              </p>
            </div>
          </div>
        </div>
        <div className={visitStyle.text}>
          <p>조문객님의 정보를 입력해주세요</p>
          <p>1분으로 유족분들에게 큰 힘이 됩니다.</p>
        </div>
        <div style={{ width: '380px', margin: '0 auto' }}>
          <div className={visitStyle.inputTitle}>이름</div>
          <input
            id="name"
            onChange={handleVisitInfo}
            className={visitStyle.inputBox}
            placeholder="이름 입력"
          ></input>

          <div className={visitStyle.inputTitle}>소속</div>
          <input
            id="team"
            onChange={handleVisitInfo}
            className={visitStyle.inputBox}
            placeholder="소속 입력"
          ></input>

          <div className={visitStyle.inputTitle}>방문한 유족 성함</div>
          <input
            id="visitedTo"
            onChange={handleVisitInfo}
            className={visitStyle.inputBox}
            placeholder="방문한 유족 성함 입력"
          ></input>
          <div className={visitStyle.inputTitle}>유족과의 관계</div>
          <div style={{ display: 'flex' }}>
            <button
              className={visitStyle.smallInputBox}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'start',
                background: '#FFF',
                width: '180px',
              }}
              onClick={() => setSelected(!selected)}
            >
              {visitInfo.relation}
              <img
                src={directionDown}
                style={{ position: 'absolute', marginLeft: '130px' }}
              ></img>
            </button>

            <input
              disabled={directInput}
              id="relation"
              onChange={handleDirectInfo}
              style={{
                marginLeft: '20px',
              }}
              className={visitStyle.smallInputBox}
              placeholder="직접 입력"
            ></input>
          </div>
          {selected ? (
            <ul onClick={handleVisitInfo}>
              <li class="category">
                <button
                  id="relation"
                  value={'친구'}
                  className={visitStyle.dropDown}
                >
                  친구
                </button>
              </li>
              <li>
                <button
                  id="relation"
                  value={'직장 동료'}
                  className={visitStyle.dropDown}
                >
                  직장 동료
                </button>
              </li>
              <li>
                <button
                  id="relation"
                  value={'지인'}
                  className={visitStyle.dropDown}
                >
                  지인
                </button>
              </li>
              <li>
                <button
                  id="relation"
                  value={'친척'}
                  className={visitStyle.dropDown}
                >
                  친척
                </button>
              </li>
              <li>
                <button
                  className={visitStyle.dropDown}
                  id="relation"
                  value={'직접입력'}
                  name="true"
                  style={{
                    borderBottom: '1px solid #d0d0d0',
                  }}
                  onClick={() => {
                    setDirectInput(false);
                  }}
                >
                  직접 입력
                </button>
              </li>
            </ul>
          ) : (
            ''
          )}
          <div className={visitStyle.inputTitle}>부의금액</div>
          <input
            id="money"
            onChange={handleVisitInfo}
            className={visitStyle.smallInputBox}
            placeholder="금액 입력"
          ></input>
          <span
            className={visitStyle.smallInputBox}
            style={{ border: '0px', marginLeft: '8px', paddingLeft: '0px' }}
          >
            원
          </span>
          <button
            onClick={handleSubmitBtn}
            style={{ justifyContent: 'center' }}
            className={visitStyle.submitBtn}
          >
            제출하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default VisitInfo;
