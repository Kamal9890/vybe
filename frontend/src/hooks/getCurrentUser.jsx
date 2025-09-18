import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUserData,setFollowing } from '../redux/userSlice'
import { serverUrl } from '../App'

const getCurrentUser = () => {

    const dispatch = useDispatch()
  useEffect(()=>{
    const fetchUser = async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true})

            dispatch(setUserData(result.data))
            dispatch(setFollowing(result.data.following))

        } catch (error) {
            
        }

    }

    fetchUser()
  },[])
}

export default getCurrentUser