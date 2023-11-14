import { useState } from 'react';
import './Modal.css';

function Modal() {
  const [state, setState] = useState({
    date: ''
    , empName: ''
    , amt: ''
  });

  return (
    <div className='back show'>
        <div id='modalBox'>
          <div id='formBox'>
            <div>
              <span className='formName'>DATE:</span> 
              <input 
                className='btn' 
                type='date' 
                value={state.date} 
                onChange={(e) => setState({...state, date: e.target.value})}
              />
            </div>
            <div>
              <span className='formName'>NAME:</span>
              <select 
                id='empName' 
                className='btn' 
                value={state.empName} 
                onChange={(e) => setState({...state, empName: e.target.value})}
              >
                  <option value="">선택</option>
                  <option value="최상배">최상배</option>
                  <option value="방영민">방영민</option>
                  <option value="이돈각">이돈각</option>
                  <option value="김현겸">김현겸</option>
                  <option value="이정모">이정모</option>
                  <option value="김은수">김은수</option>
              </select>
            </div>
            <div>
              <span className='formName'>AMT:</span> 
              <input 
                className='btn' 
                type='text' 
                value={state.amt} 
                onChange={(e) => setState({...state, amt: e.target.value})}
              />
            </div>
          </div>

          <div className='modalBtnBox'>
            <input id='btnAdd' className='btn' type='button' value='ADD' />
            <input id='btnClose' className='btn' type='button' value='CLOSE' />
          </div>
        </div>
    </div>
  );
}

export default Modal;
