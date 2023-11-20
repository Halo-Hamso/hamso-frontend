import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Log_in_business from "./Log_in_business";
import Log_in_family from "./Log_in_family";

import Password_Finding from './Password_Finding';

import Sign_up_select from "./Sign_up_select";
import Sign_up_family from "./Sign_up_family";
import Sign_up_business from "./Sign_up_business";
import Sign_up_thanks from "./Sign_up_thanks";

import VisitInfo from "./VisitInfo";

import Home_Account_Analysis from "./Home_Account_Analysis";
import Home_Account_Table from "./Home_Account_Table";
import Home_Account_Statistics from "./Home_Account_Statistics";




function App() {
  return (
    <Router>
      <Routes>
        <Route path={`${process.env.PUBLIC_URL}/`} element={<Log_in_family />}></Route>
        <Route path='/log_in_business' element={<Log_in_business />}></Route>
        <Route path='/password_finding' element={<Password_Finding/>}></Route>

        <Route path="/sign_up_select" element={<Sign_up_select/>}></Route>
        <Route path="/sign_up_family" element={<Sign_up_family/>}></Route>
        <Route path="/sign_up_business" element={<Sign_up_business/>}></Route>
        <Route path="/sign_up_thanks" element={<Sign_up_thanks/>}></Route>

        <Route path = '/home_account_analysis' element={<Home_Account_Analysis></Home_Account_Analysis>}></Route>
        <Route path = '/home_account_table' element={<Home_Account_Table></Home_Account_Table>}></Route>
        <Route path = '/home_account_statistics' element={<Home_Account_Statistics></Home_Account_Statistics>}></Route>

        <Route path="/visitinfo" element={<VisitInfo />} />
      </Routes>
    </Router>
  );
} //이젠 swtich가 아니라 'Routes'로 지원하고, Route는 다음과 같은 형식을 따라야 함

// ★★★★ "/"는 홈화면으로 가는 루트(url뒤에 아무것도 안 붙음) => x
//홈화면으로 가는게 아니라 엄밀히 원리를 말하자면
/*"http://abc/efg"에서 'http://' 바로 옆까지의 링크를 의미함. 죽
abc까지만 포함. package.json의 homepage에서 efg까지 포함되어있다고
'/'가 efg까지 포함하는 것은 아니다!! ★★★★ */

// "/movie"를 붙이면 Detail.js로 이동
// "/:id"를 붙이면 해당 movie 컴포넌트의 id표시 (Home.js에서 id property를 생성, movie.id를 대입해서 받아옴)
export default App;
