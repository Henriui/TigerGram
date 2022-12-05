import './App.css';
import React from 'react';
import Fab from '@material-ui/core/Fab';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';

function App() {
  return (
    <div className="app">
      <div className="app_header">
        <h1 className='app_name'>TigerGram</h1>
        <div>
          <Fab variant="extended" size="small" color="primary" className="app_signinBtn" onClick={() => /*setOpenSignin(true)*/ console.log("asd")}>
            <LockOpenOutlinedIcon fontSize="small" /> SIGN IN
          </Fab>
          <Fab variant="extended" size="small" color="secondary" onClick={() => /*setOpen(true)*/ console.log("asd")}>
            <PersonAddOutlinedIcon fontSize="small" /> SIGN UP
          </Fab>
        </div>
      </div>
    </div>
  );
}

export default App;
