import './Header.css';

function Header({ fnSetHeaderState, headerState }) {
  return (
    <header>
      <div id="logo">TS</div>
      <div id="date">
          <input 
            id='yearMonth' 
            className='btn' 
            type="month" 
            value={headerState.yearMonth} 
            onChange={(e) => fnSetHeaderState('date', e.target.value)}
          />
          <select 
            id='empName' 
            className='btn' 
            value={headerState.empName} 
            onChange={(e) => fnSetHeaderState('name', e.target.value)}
          >
              <option value="">ALL</option>
              <option value="최상배">최상배</option>
              <option value="방영민">방영민</option>
              <option value="이돈각">이돈각</option>
              <option value="김현겸">김현겸</option>
              <option value="이정모">이정모</option>
              <option value="김은수">김은수</option>
          </select>
      </div>
      <div id='menu'>
          <svg height="1.2em" viewBox="0 0 448 512">
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
          </svg>
      </div>
    </header>
  );
  }
  
  export default Header;