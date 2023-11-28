import { useState, useEffect } from 'react';
import './App.css';
import Header from './component/Header';
import ResGrid from './component/ResGrid';

function App() {
  const [data, setData] = useState([]);
  const [headerState, setHeaderState] = useState({
    yearMonth: ''
    , empName: ''
  });
  const fnSelectResList = async () => {
    try {
      // let res = await fetch(`http://${process.env.REACT_APP_API}/selectResList`, {
      //   method: "POST"
      //   , header: { "Content-Type": "application/json" }
      //   , body: new URLSearchParams({
      //     "date": headerState.yearMonth.replaceAll('-', '')
      //     , "name": headerState.empName
      //   })
      // })
      // new Promise( (resolve, resject) => resolve(res.json()) ).then((res) => fnSetData(res));

      const xhr = new XMLHttpRequest(); //XMLHttpRequest 객체 생성
      xhr.open("POST", `http://${process.env.REACT_APP_API}/selectResList`); //HTTP Method, URL 정의
      xhr.setRequestHeader("content-type", "application/json; charset=UTF-8"); //헤더값 중 content-type 정의

      xhr.send(JSON.stringify({
        "date": headerState.yearMonth.replaceAll('-', '')
        , "name": headerState.empName
      }))  //요청 전송

      xhr.onload = () => {
          if(xhr.status === 201) {
              //201 상태코드는 요청이 성공적으로 처리 됬다는말/ 일반적으로 POST요청에 대한 응답
              const res = JSON.parse(xhr.response); // 응답데이터를 JSON.parse 함수의 JSON 객체로 변경
              console.log(res); //응답데이터 출력
              fnSetData(res);
          } else {
              //에러발생
              console.error(xhr.status, xhr.statusText); //응답상태와 응답 메시지 출력
          }
      }
    } catch(e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fnSelectResList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerState])

  const fnSetData = (data) => {
    setData(data);
  }

  const fnSetHeaderState = (type, value) => {
    if(type === 'date') {
      setHeaderState({...headerState, yearMonth: value});
    } else if(type === 'name') {
      setHeaderState({...headerState, empName: value});
    }
  }

  return (
    <div className="App">
      <Header fnSetData={fnSetData} fnSetHeaderState={fnSetHeaderState} headerState={headerState}/>
      <ResGrid _data={data} fnSelectResList={fnSelectResList} />
    </div>
  );
}

export default App;
