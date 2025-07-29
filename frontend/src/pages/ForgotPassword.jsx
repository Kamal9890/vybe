import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'

const ForgotPassword = () => {


       const [step,setStep] = useState(3)


    //    input onClick
       const [inputClicked, setInputClicked] = useState({
          
           email: false,
           otp:false,
           newPassword:false,
           confirmPassword:false
          
         })

         // loading 

        const [loading,setLoading] = useState(false)



        //  state 
        const [email,setEmail] = useState(false)
        const [otp,setOtp] = useState(false)
        const [newPassword,setNewPassword] = useState(false)
        const [confirmNewPassword,setConfirmNewPassword] = useState(false)


  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 
    flex  flex-col justify-center items-center'>

       {step==1 &&  
       
       <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] '>
            <h2 className='text-[30px] font-semibold '>Forgot password</h2>
             <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked,email: true })}>

            <label htmlFor="email" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.email ? "top-[-15px]" : ""}`}>Enter Your Email</label>
            <input type="email" id='email' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  'onChange={(e)=>setEmail(e.target.value)} />



          </div>

          <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px]
           cursor-pointer rounded-2xl mt-[30px] ' disabled={loading}> {loading?<ClipLoader size={30} color='white'  />:"Send Otp"}</button>
        
        
      


          

          
        </div> }


        {step==2 && <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] '>
            <h2 className='text-[30px] font-semibold '>Forgot password</h2>
             <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked,otp: true })}>

            <label htmlFor="otp" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.otp ? "top-[-15px]" : ""}`}>Enter Otp</label>
            <input type="text" id='otp' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  'onChange={(e)=>setOtp(e.target.value)} />



          </div>

          <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px]
           cursor-pointer rounded-2xl mt-[30px] ' disabled={loading}> {loading?<ClipLoader size={30} color='white'  />:"Submit"}</button>
        
        
      


          

          
        </div>}

      {step==3 &&  <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23] '>
            <h2 className='text-[30px] font-semibold '>Reset password</h2>
           
             <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked,newPassword: true })}>

            <label htmlFor="newPassword" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.newPassword ? "top-[-15px]" : ""}`}>New Password</label>
            <input type="text" id='newPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  'onChange={(e)=>setNewPassword(e.target.value)} />



          </div>

          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked,confirmPassword: true })}>

            <label htmlFor="confirmnewPassword" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.confirmPassword ? "top-[-15px]" : ""}`}>Confirm New Password</label>
            <input type="text" id='confirmnewPassword' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  'onChange={(e)=>setConfirmNewPassword(e.target.value)} />



          </div>


          <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px]
           cursor-pointer rounded-2xl mt-[30px] ' disabled={loading}> {loading?<ClipLoader size={30} color='white'  />:"Reset Password"}</button>
        
        
      


          

          
        </div> }

    </div>
  )
}

export default ForgotPassword