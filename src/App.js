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
      let res = await fetch(`http://${process.env.REACT_APP_API}/selectResList`, {
        method: "POST"
        , header: { "Content-Type": "application/json" }
        , body: new URLSearchParams({
          "date": headerState.yearMonth.replaceAll('-', '')
          , "name": headerState.empName
        })
      })
      new Promise( (resolve, resject) => resolve(res.json()) ).then((res) => fnSetData(res));

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
