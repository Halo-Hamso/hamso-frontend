import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Sign_up from "./Sign_up";
import Log_in from "./Log_in";
import Home from "./Home";

function App(){
  return <Router> 
    <Routes>
      <Route path = {`${process.env.PUBLIC_URL}/`} element = {<Log_in/>}></Route>
      <Route path = '/home' element = {<Home></Home>}></Route>
      <Route path = '/sign_up' element = {<Sign_up/>}></Route>
    </Routes>
  </Router>
} //이젠 swtich가 아니라 'Routes'로 지원하고, Route는 다음과 같은 형식을 따라야 함

// ★★★★ "/"는 홈화면으로 가는 루트(url뒤에 아무것도 안 붙음) => x
//홈화면으로 가는게 아니라 엄밀히 원리를 말하자면 
/*"http://abc/efg"에서 'http://' 바로 옆까지의 링크를 의미함. 죽
abc까지만 포함. package.json의 homepage에서 efg까지 포함되어있다고
'/'가 efg까지 포함하는 것은 아니다!! ★★★★ */


// "/movie"를 붙이면 Detail.js로 이동
// "/:id"를 붙이면 해당 movie 컴포넌트의 id표시 (Home.js에서 id property를 생성, movie.id를 대입해서 받아옴)
export default App;
