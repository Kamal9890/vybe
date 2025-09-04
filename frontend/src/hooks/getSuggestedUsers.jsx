import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setsuggestedUsers } from '../redux/userSlice.js'
import { serverUrl } from '../App.jsx'

const getSuggestedUsers = () => {

    const dispatch = useDispatch()

    const {userData} = useSelector(state=>state.user)



  useEffect(()=>{
    const fetchUser = async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/user/suggested`,{withCredentials:true})

            dispatch(setsuggestedUsers(result.data))

        } catch (error) {
             console.log(error);
             
        }

    }

    fetchUser()
  },[userData])
}

export default getSuggestedUsers