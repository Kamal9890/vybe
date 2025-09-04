import React, { use, useRef, useState } from 'react'
import { IoArrowBackSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import dp from "../assets/dp.png"
import { serverUrl } from '../App';
import { setProfileData, setUserData } from '../redux/userSlice';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

const EditProfile = () => {

    //  const { userName } = useParams()
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const imageInput = useRef()
    const [frontendImage, setFrontendImage] = useState(userData.profileImage || dp)
    const [backendImage, setBackendImage] = useState(null)

    const [name, setName] = useState(userData.name || "")
    const [userName, setUserName] = useState(userData.userName || "")
    const [bio, setBio] = useState(userData.bio || "")
    const [profession, setProfession] = useState(userData.profession || "")
    const [gender, setGender] = useState(userData.gender || "")
    const [loading,setLoading] = useState(false)

    const dispatch= useDispatch()

    const handleImage = (e) => {
        const file = e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handEditProfile = async () => {
        setLoading(true)

        try {
            const formdata = new FormData()
            formdata.append("name",name)
            formdata.append("userName",userName)
            formdata.append("bio",bio)
            formdata.append("profession",profession)
            formdata.append("gender",gender)

            if(backendImage)
            {
                formdata.append("profileImage",backendImage)
            }

            const result = await axios.post(`${serverUrl}/api/user/editProfile`,formdata, {
                withCredentials:true
            })
            dispatch(setProfileData(result.data))
            dispatch(setUserData(result.data))
            setLoading(false)
            navigate( `/profile/${userData.userName}`)
        } catch (error) {

            console.log(error);
            
        }
        
    }


    return (
        <div className='w-full min-h-[100vh] bg-black flex items-center flex-col gap-[16px]  '>

            <div className='w-full h-[80px]   flex items-center gap-[20px] px-[20px] '> <IoArrowBackSharp className='text-white w-[25px] h-[25px] cursor-pointer '
                onClick={() => navigate(`/profile/${userData.userName}`)} />

                <h1 className='text-white text-[20px] font-semibold '>Edit Profile</h1>

            </div>

            <div className=' w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2  border-black rounded-full 
            cursor-pointer overflow-hidden ' onClick={() => imageInput.current.click()}>

                <input type="file" accept='image/*' ref={imageInput} hidden
                    onChange={handleImage}
                />
                <img src={frontendImage} alt="" className='w-full object-cover ' />

            </div>

            {/* // change profile picture  */}

            <div className='text-blue-500 text-center text-[18px] cursor-pointer '
                onClick={() => imageInput.current.click()}>
                Change your Profile Picture </div>

            {/* // inputs  */}


            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 
            rounded-2xl px-[20px] outline-none text-white font-semibold ' placeholder='Enter Your Name' 
            onChange={((e)=>setName(e.target.value))} value={name} />
            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700
             rounded-2xl px-[20px] outline-none text-white font-semibold ' placeholder='UserName'
               onChange={((e)=>setUserName(e.target.value))} value ={userName}  />
            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700
             rounded-2xl px-[20px] outline-none text-white font-semibold ' placeholder='Enter Bio'
               onChange={((e)=>setBio(e.target.value))} value={bio} />
            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700
             rounded-2xl px-[20px] outline-none text-white font-semibold ' placeholder='Enter Profession' 
               onChange={((e)=>setProfession(e.target.value))} value={profession}/>
            <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700
             rounded-2xl px-[20px] outline-none text-white font-semibold ' placeholder='Enter Gender' 
               onChange={((e)=>setGender(e.target.value))} value={gender}/>

            <button className='px-[10px] w-[60%] max-w-[400px] py-[5px] h-[50px] bg-[white] cursor-pointer
             rounded-2xl '
             onClick={handEditProfile}>
             {loading ? <ClipLoader size={30} color='black'/>:"Save Profile" }
             </button>

        </div>
    )
}

export default EditProfile