import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'

export const serverUrl ="http://localhost:8000"
const App = () => {
  return (
    <Routes>
      <Route path='/signup' element ={<SignUp/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/forgot-password' element ={<ForgotPassword/>}/>
    </Routes>
  )
}

export default App