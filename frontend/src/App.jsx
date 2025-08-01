import React from 'react'
import { Navigate, Route,  Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'
import getSuggestedUser from './hooks/getSuggestedUsers'


export const serverUrl ="http://localhost:8000"



const App = () => {

  getCurrentUser()
  getSuggestedUser()
  const {userData} = useSelector(state=>state.user)
  
  return (
    <Routes>
      <Route path='/signup' element ={!userData?<SignUp/>:<Navigate to={"/"}/>}/>
      <Route path='/login' element ={!userData?<Login/>:<Navigate to={"/"}/>}/>
      <Route path='/' element ={ userData ? <Home/> : <Navigate to={"/login"}/>}/>
      <Route path='/forgot-password' element ={!userData?<ForgotPassword/>:<Navigate to={"/"}/>}/>
    </Routes>
  )
}

export default App