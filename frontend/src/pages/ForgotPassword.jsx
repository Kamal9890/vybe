import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { serverUrl } from '../App'
import axios from "axios"

const ForgotPassword = () => {


  const [step, setStep] = useState(1)


  //    input onClick
  const [inputClicked, setInputClicked] = useState({

    email: false,
    otp: false,
    newPassword: false,
    confirmPassword: false

  })

  // loading 

  const [loading, setLoading] = useState(false)



  //  state 
  const [email, setEmail] = useState(false)
  const [otp, setOtp] = useState(false)
  const [newPassword, setNewPassword] = useState(false)
  const [confirmNewPassword, setConfirmNewPassword] = useState(false)
  const [err, setErr] = useState("")




  // api fetches 

  const handleStep1 = async () => {
    setErr("")
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendOtp`, { email }, { withCredentials: true })
      console.log(result.data);
      setStep(2)
      setLoading(false)

    } catch (error) {
      console.log(error);
      setLoading(false)
      setErr(error.response?.data.message)
    }
  }

  // step 2 

  const handleStep2 = async () => {
    setErr("")
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyOtp`, { email, otp }, { withCredentials: true })
      console.log(result.data);
      setStep(3)
      setLoading(false)
    } catch (error) {
      setErr(error.response?.data.message)
      console.log(error);
      setLoading(false)
    }
  }

  //step3 

  const handleStep3 = async () => {



    if (newPassword !== confirmNewPassword) {
      return setErr("password does not match ");

    }

    setErr("")
    setLoading(true)
    try {





      const result = await axios.post(`${serverUrl}/api/auth/resetPassword`, { email, password: newPassword }, { withCredentials: true })
      console.log(result.data);
      setLoading(false)

    } catch (error) {
      setErr(error.response?.data.message)
      console.log(error);
      setLoading(false)

    }
  }


  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 
    flex  flex-col justify-center items-center'>


      {step == 1 &&

        <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] '>
          <h2 className='text-[30px] font-semibold '>Forgot password</h2>
          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked, email: true })}>

            <label htmlFor="email" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.email ? "top-[-15px]" : ""}`}>Enter Your Email</label>
            <input type="email" id='email' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  ' onChange={(e) => setEmail(e.target.value)} />



          </div>

          {/* error  */}


          {err && <p className='text-red-500'> {err}</p>}

          <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px]
           cursor-pointer rounded-2xl mt-[30px] ' disabled={loading} onClick={handleStep1}> {loading ? <ClipLoader size={30} color='white' /> : "Send Otp"}</button>








        </div>}


      {step == 2 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] '>
        <h2 className='text-[30px] font-semibold '>Forgot password</h2>
        <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked, otp: true })}>

          <label htmlFor="otp" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.otp ? "top-[-15px]" : ""}`}>Enter Otp</label>
          <input type="text" id='otp' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  ' onChange={(e) => setOtp(e.target.value)} />



        </div>
        {/* error  */}


        {err && <p className='text-red-500'> {err}</p>}

        <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px]
           cursor-pointer rounded-2xl mt-[30px] ' disabled={loading} onClick={handleStep2}> {loading ? <ClipLoader size={30} color='white' /> : "Submit"}</button>








      </div>}

      {step == 3 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] '>
        <h2 className='text-[30px] font-semibold '>Reset password</h2>

        <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked, newPassword: true })}>

          <label htmlFor="newPassword" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.newPassword ? "top-[-15px]" : ""}`}>New Password</label>
          <input type="text" id='newPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  ' onChange={(e) => setNewPassword(e.target.value)} />



        </div>

        <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked, confirmPassword: true })}>

          <label htmlFor="confirmnewPassword" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.confirmPassword ? "top-[-15px]" : ""}`}>Confirm New Password</label>
          <input type="text" id='confirmnewPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  ' onChange={(e) => setConfirmNewPassword(e.target.value)} />



        </div>

        {/* error  */}


        {err && <p className='text-red-500'> {err}</p>}


        <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px]
           cursor-pointer rounded-2xl mt-[30px] ' disabled={loading} onClick={handleStep3}> {loading ? <ClipLoader size={30} color='white' /> : "Reset Password"}</button>








      </div>}

    </div>
  )
}

export default ForgotPassword