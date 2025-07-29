import React, { useState } from 'react'
import logo from "../assets/logo.png"
import logo1 from "../assets/logo1.png"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { serverUrl } from '../App';
import axios from "axios"
import { ClipLoader} from 'react-spinners'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [inputClicked, setInputClicked] = useState({
    name: false,
    userName: false,
    email: false,
    password: false
  })

  // password show 

  

  const [showPassword,setShowPassword]= useState(false)

  // loading 

  const [loading,setLoading] = useState(false)

  // input access 

  const [name,setName] = useState(false)
  const [email,setEmail] = useState(false)
  const [userName,setUserName] = useState(false)
  const [password,setPassword] = useState(false)

  const navigate = useNavigate()


  // access register 

  const handleSingup = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signup`,
        {name,email,userName,password},{withCredentials:true})

      console.log(result.data);

      setLoading(false)
      
    } catch (error) {
      console.log(error);
      setLoading(false)
      
    }
    
  }



  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 
    flex  flex-col justify-center items-center'>

      <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center
       items-center overflow-hidden border-2 border-[#1a1f23]'>

        <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20]'>
          <div className='flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]'>
            <span>Sign Up to</span>
            <img src={logo} alt="" className='w-[70px]' />
          </div>



         {/* Name Div */}


          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({...inputClicked, name: true })}>

            <label htmlFor="name" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.name ? "top-[-15px]" : ""}`}>Enter Your Name</label>
            <input type="text" id='name' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  ' onChange={(e)=>setName(e.target.value)} required/>


          </div>

           {/* UserName div */}

        <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked,userName: true })}>

            <label htmlFor="userName" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.userName ? "top-[-15px]" : ""}`}>Enter Your UserName</label>
            <input type="userName" id='userName' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  'onChange={(e)=>setUserName(e.target.value)} required/>


          </div>

           {/* Email dIV  */}

          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked,email: true })}>

            <label htmlFor="email" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.email ? "top-[-15px]" : ""}`}>Enter Your Email</label>
            <input type="email" id='email' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  'onChange={(e)=>setEmail(e.target.value)} required/>


          </div>


{/* 
         // password div  */}

          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked,password: true })}>

            <label htmlFor="password" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.password ? "top-[-15px]" : ""}`}>Enter Password</label>
            <input type={showPassword? "text":"password"} id='password' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  ' onChange={(e)=>setPassword(e.target.value)} required/>
            
            {!showPassword?<IoIosEye className='absolute cursor-pointer  right-[20px] w-[25px] h-[25px]  '
             onClick={()=>setShowPassword(true)}/>:<IoIosEyeOff className='absolute cursor-pointer  right-[20px] w-[25px] h-[25px]  '
             onClick={()=>setShowPassword(false)}/>}

          </div>


          {/* // sign up button */}

          <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px]
           cursor-pointer rounded-2xl mt-[30px] ' onClick={handleSingup } disabled={loading}> {loading?<ClipLoader size={30} color='white'  />:"Register"}</button>
              <p className='cursor-pointer text-gray-800 mt-[15px] ' onClick={()=>navigate('/login')}>Already have an account ?  <span className='border-b-2 border-b-red text-red-600 '>Login</span></p>
        </div>



        {/* // right side div */}
        <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] 
        flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black
        '>

          <img src={logo1} alt=""  className='w-[40%]'/>
          <p>Not Just a platform it's a VYBE</p>
        </div>

      </div>

    </div>
  )
}

export default SignUp