import React from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Pages/Home/Home.jsx'
import Login from './Pages/Login/Login.jsx'
import Singup from './Pages/Singup/Singup.jsx'

const routes = (
  <Router>
    <Routes>
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