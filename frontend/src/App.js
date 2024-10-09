import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './contexts/notes/NoteState';
import Alerts from './components/Alerts';
import Login from './components/Login';
import Signin from './components/Signin';

function App() {
  const [alert, setAlert] = useState({msg: "", type:""});
  const showAlert = (msg, type)=>{
    setAlert({
      msg, type
    })
    setTimeout(()=>{
      setAlert({msg: "", type:""});
    }, 3000)
  }
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alerts msg={alert.msg} type={alert.type} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              <Route exact path="/signin" element={<Signin showAlert={showAlert}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
