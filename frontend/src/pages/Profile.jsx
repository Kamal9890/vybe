import axios from 'axios'
import React, { useEffect } from 'react'
import { serverUrl } from '../App'
import { useNavigate, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData } from '../redux/userSlice'
import { IoArrowBackSharp } from "react-icons/io5";
import dp from "../assets/dp.png"
import Nav from '../components/Nav'
import FollowButton from '../components/FollowButton'

const Profile = () => {

    const { userName } = useParams()
    const dispatch = useDispatch()
    const navigate= useNavigate()

    // profile data 

    const { userData, profileData } = useSelector(state => state.user)

    const handleProfile = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/getProfile/${userName}`, { withCredentials: true })
            dispatch(setProfileData(result.data))
        } catch (error) {
            console.log(error);

        }
    }


    // Logout function 

    const handleLogout = async () => {

        try {

            const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })

            dispatch(setUserData(null))


        } catch (error) {
            console.log(error);

        }

    }

    useEffect(() => {
        handleProfile()
    }, [userName, dispatch])

    return (
        <div className='w-full min-h-screen bg-black '>

            {/* back arrow  */}

            <div className='w-full h-[80px] flex justify-between items-center px-[30px] text-white '
            >
                <div onClick={()=>navigate("/")}> <IoArrowBackSharp className='text-white w-[25px] h-[25px] cursor-pointer ' /> </div>

                {/* username  */}

                <div className='font-semibold text-[20px] '> {profileData?.userName} </div>


                {/* logout  */}

                <div className='font-semibold cursor-pointer text-[20px] text-red-600 ' onClick={handleLogout} > Log Out </div>
            </div>

            <div className='w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center '>

                {/* Profile dekhon */}
                
                <div className=' w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden '>

                    <img src={profileData?.profileImage || dp} alt="" className='w-full object-cover ' />

                </div>


                <div>
                    <div className='font-semibold text-[22px] text-white '>{profileData?.name}</div>

                    <div className='text-[17px] text-[#ffffffe8]'>{profileData?.profession || "New User"} </div>


                    <div className='text-[17px] text-[#ffffffe8]'>{profileData?.bio} </div>
                </div>

            </div>


            {/* // followers following posts  */}


            <div className='text-white w-full h-[100px] flex items-center justify-center gap-[40px] md:gap[60px] px-[20%] pt-[30px] '>

                {/* Post  */}
                <div>
                    <div className='text-white text-[22px] md:text-[30px] font-semibold  '> {profileData?.posts?.length || 0}</div>
                    <div className='text-[18px] md:text-[22px] text-[#ffffffc7]  '>Posts</div>
                </div>

                {/* Followers   */}

                <div>
                    <div className='flex items-center justify-center gap-[20px] '>
                        
                        <div className='flex relative'>
                            {profileData?.followers?.slice(0, 3).map((user,index)=>
                            (
                            <div className={`w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer
                             overflow-hidden ${index > 0? `absolute left-[${index*9}]`:""}`}>

                                <img src={user?.profileImage || dp} alt="" className='w-full object-cover ' />

                            </div>

                            ))}
                            
                           

                        </div>
                        <div  className='text-white text-[22px] md:text-[30px] font-semibold '>
                             {profileData?.followers?.length || 0}

                        </div>

                       
                    </div>
                    <div className='text-[18px] md:text-["22px] text-[#ffffffc7]  '>Followers</div>
                </div>


                {/* following  */}

                <div>
                    <div className='flex items-center justify-center gap-[20px] '>
                        
                        <div className='flex relative'>
                            <div className='w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden '>

                                <img src={userData?.profileImage || dp} alt="" className='w-full object-cover ' />

                            </div>
                            <div className='w-[40px] h-[40px] absolute left-[10px]  border-2 border-black
                             rounded-full cursor-pointer overflow-hidden '>

                                <img src={userData?.profileImage || dp} alt="" className='w-full object-cover ' />

                            </div>

                            <div className='w-[40px] h-[40px] absolute left-[20px]  border-2 border-black rounded-full cursor-pointer overflow-hidden '>

                                <img src={userData?.profileImage || dp} alt="" className='w-full object-cover ' />

                            </div>

                        </div>
                        <div  className='text-white text-[22px] md:text-[30px] font-semibold '>
                             {profileData?.following?.length || 0}

                        </div>

                       
                    </div>
                    <div className='text-[18px] md:text-["22px] text-[#ffffffc7]  '>Following</div>
                </div>
            </div>



            {/* // buttons edit follow message  */}
            <div className='w-full h-[80px] flex justify-center items-center gap-[15px] mt-[10px] '>

                {profileData?._id == userData._id && 
                
                <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl ' onClick={()=>navigate("/editprofile")}>Edit Profile</button> }

                {profileData?._id != userData._id && 
                  <>
                     <FollowButton tailwind={'px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl '} 
                     targetUserId={profileData?._id} onFollowChange = {handleProfile}/>
                   
                    <button className='px-[10px] min-w-[150px] py-[5px] h-[40px]
                     bg-[white] cursor-pointer rounded-2xl '>Message</button> 


                  </>
                }
             
            </div>


            {/* Posts  */}

            <div className='w-full min-h-[100vh] flex justify-center  '>
                <div className='w-full max-w[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] '>
                <Nav/>
                </div>

            </div>



        </div>
    )
}

export default Profile