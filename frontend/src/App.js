import React from 'react'
import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom';
import Main from './Main'
import Login from './login/Login'
import Home from './Home';
const App = () => {
  const user=localStorage.getItem("token")
  return (
    <BrowserRouter>
      <Routes>
        {user && <Route path="/" exact element={<Home/>}/>}
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/' exact element={<Navigate replace to="/login"/>} />
        <Route path='/documentEditor' exact element={<Main/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
