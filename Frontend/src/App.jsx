import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import Singup from './Pages/Singup/Singup.jsx'
import Modal from 'react-modal';


Modal.setAppElement('#root');

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path = "/dashboard" exact element={<Home/>} />
      <Route path = "/login" exact element={<Login/>} />
      <Route path = "/singup" exact element={<Singup/>} />
    </Routes>
  </Router>
)


const App = () => {
  return (
      <div>{routes}</div>
  )
}

export default App;