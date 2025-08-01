import React, { useState } from 'react'
import logo from "../assets/logo.png"
import logo1 from "../assets/logo1.png"
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { serverUrl } from '../App';
import axios from "axios"
import { ClipLoader} from 'react-spinners'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';

const Login = () => {

  const [inputClicked, setInputClicked] = useState({
   
    userName: false,
   
    password: false
  })

  // password show 

  

  const [showPassword,setShowPassword]= useState(false)

  // loading 

  const [loading,setLoading] = useState(false)

  // input access 

 
  const [userName,setUserName] = useState(false)
  const [password,setPassword] = useState(false)
  const [err,setErr]= useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()


  // access register 

  const handleLogin = async () => {
    setErr("")
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`,
        {userName,password},{withCredentials:true})

      dispatch(setUserData(result.data))

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

      <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center
       items-center overflow-hidden border-2 border-[#1a1f23]'>

        <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center justify-center p-[10px] gap-[20]'>
          <div className='flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]'>
            <span>Login to</span>
            <img src={logo} alt="" className='w-[70px]' />
          </div>



        

           {/* UserName div */}

        <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked,userName: true })}>

            <label htmlFor="userName" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.userName ? "top-[-15px]" : ""}`}>Enter Your UserName</label>
            <input type="userName" id='userName' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  'onChange={(e)=>setUserName(e.target.value)} required/>


          </div>



{/* // password div  */}

          <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] 
                   border-2 border-black   ' onClick={() => setInputClicked({ ...inputClicked,password: true })}>

            <label htmlFor="password" className={`text-gray-700 absolute left-[20px] p-[2px] bg-white text-15px ${inputClicked.password ? "top-[-15px]" : ""}`}>Enter Password</label>
            <input type={showPassword? "text":"password"} id='password' className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0  ' onChange={(e)=>setPassword(e.target.value)}  required/>
            
            {!showPassword?<IoIosEye className='absolute cursor-pointer  right-[20px] w-[25px] h-[25px]  '
             onClick={()=>setShowPassword(true)}/>:<IoIosEyeOff className='absolute cursor-pointer  right-[20px] w-[25px] h-[25px]  '
             onClick={()=>setShowPassword(false)}/>}



          </div>

          {/* forgot password */}

          <div className='w-[90%] mt-[15px] px-[20px] cursor-pointer text-blue-600 ' onClick={()=> navigate('/forgot-password')}>Forgot Password</div>

 {/* error  */}


             {err && <p className='text-red-500'> {err}</p>}
          {/* // sign up button */}

          <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px]
           cursor-pointer rounded-2xl mt-[30px] ' onClick={handleLogin } disabled={loading}> {loading?<ClipLoader size={30} color='white'  />:"Login"}</button>
              <p className='cursor-pointer text-gray-800 mt-[15px] ' onClick={()=>navigate('/signup')}>want to create new Account ?  <span className='border-b-2 border-b-red text-red-600 '>Register</span></p>
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

export default Login