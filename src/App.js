import './App.css';
import Header from './component/Header';
import ResGrid from './component/ResGrid';

function App() {
  const data = [
    {
        date: '20231113'
        , empName: '김은수'
        , amt: '10000'
    }
    , {
        date: '20231113'
        , empName: '김은수'
        , amt: '10000'
    }
  ];

  return (
    <div className="App">
      <Header/>
      <ResGrid _data={data}/>
    </div>
  );
}

export default App;
