import React from 'react'
import {GoHomeFill} from "react-icons/go"
import {FiSearch} from "react-icons/fi"
import {RxVideo} from "react-icons/rx"
import { FiPlusSquare } from "react-icons/fi";
import dp from '../assets/dp.png'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const Nav = () => {

  const navigate = useNavigate()
  const {userData} = useSelector(state=>state.user)


  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] 
       rounded-full shadow-2xl shadow-[#000000] z-[100] '>

        <div  onClick={()=>navigate("/")}><GoHomeFill className='text-white w-[25px] h-[25px] cursor-pointer '/></div>
        

        {/* search icons */}
        <div> <FiSearch className='text-white w-[25px] h-[25px] cursor-pointer'/></div>

         {/* for posts icon  */}

         <div onClick={()=>navigate("/upload")} ><FiPlusSquare className='text-white w-[25px] h-[25px] cursor-pointer' /> </div>

        {/* reels icons  */}
        <div><RxVideo className='text-white w-[30px] h-[30px] cursor-pointer'/> </div>

        {/* profile  */}

         <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden '
           onClick={()=>navigate(`/profile/${userData.userName}`)} >
        
                        <img src={userData.profileImage ||   dp} alt="" className='w-full object-cover '/>
        
                    </div>



       </div>
  )
}

export default Nav