import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setsuggestedUser } from '../redux/userSlice.js'
import { serverUrl } from '../App.jsx'

const getSuggestedUser = () => {

    const dispatch = useDispatch()

    const {userData} = useSelector(state=>state.user)



  useEffect(()=>{
    const fetchUser = async()=>{
        try {
            const result = await axios.get(`${serverUrl}/api/user/suggested`,{withCredentials:true})

            dispatch(setsuggestedUser(result.data))

        } catch (error) {
            
        }

    }

    fetchUser()
  },[userData])
}

export default getSuggestedUser