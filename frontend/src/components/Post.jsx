import React, { useState } from 'react'
import dp from "../assets/dp.png"
import VideoPlayer from './VideoPlayer'
import { useDispatch, useSelector } from 'react-redux'
import { GoBookmarkFill, GoHeart, GoHeartFill } from 'react-icons/go'
import { MdOutlineBookmarkBorder, MdOutlineComment } from 'react-icons/md'
import { IoSendSharp } from 'react-icons/io5'
import axios from 'axios'
import { serverUrl } from '../App'
import { setPostData } from '../redux/postSlice'

const Post = ({ post }) => {

  const { userData } = useSelector(state => state.user)
  const { postData } = useSelector(state => state.post)
  const [showComment, setShowComment] = useState(false)

  const [message, setMessage] = useState("")

  const disPatch = useDispatch()

  const handleLike = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/post/like/${post._id}`, { withCredentials: true })
      const updatedPost = result.data

      const updatePostsLike = postData.map(postfeed => postfeed._id == post._id ? updatedPost : postfeed)
      disPatch(setPostData(updatePostsLike))

    } catch (error) {
      console.log(error);

    }

  }


  const handleComment = async () => {
    try {
      const result = await axios.post(`${serverUrl}/api/post/comment/${post._id}`, { message }, { withCredentials: true })
      const updatedPost = result.data

      const updatePostsComment = postData.map(postfeed => postfeed._id == post._id ? updatedPost : postfeed)
      disPatch(setPostData(updatePostsComment))

    } catch (error) {
      console.log(error);

    }

  }



  return (
    <div className='w-[90%]  flex flex-col gap-[10px] bg-white items-center shadow-2xl shadow-[#00000058]
    rounded-2xl pb-[20px] '>

      <div className='w-full h-[80px] flex justify-between items-center px-[10px] '>
        <div className='flex justify-center items-center gap-[10px] md:gap-[20px] '>
          <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden '>

            <img src={post.author?.profileImage || dp} alt="" className='w-full object-cover ' />

          </div>
          <div className='w-[150px] font-semibold truncate '>{post.author.userName}</div>
        </div>

        <button className=" px-[10px]  md:w-[100px] py=[5px] h-[30px] md:h-[40px] bg-[#fe5252] text-white
             rounded-xl text-[14px] md:text-[16px] cursor-pointer ">Follow</button>

      </div>

      <div className='w-[90%] flex items-center justify-center  '>

        {post.mediaType == "image" &&
          <div className='w-[90%]  flex  items-center justify-center  '>
            <img src={post.media} alt="" className='w-[80%] rounded-2xl max:w-full object-cover ' />

          </div>}

        {post.mediaType == "video" &&
          <div className='w-[80% flex flex-col items-center justify-center
                    '>
            <VideoPlayer media={post.media} />

          </div>

        }








      </div>

      {/* like comment and saved div  */}

      <div className='w-full h-[60px] flex justify-between items-center px-[20px] mt-[10px] '>

        {/* left part */}
        <div className=' flex justify-center items-center gap-[10px] '>
          {/* like part  */}
          <div className='flex justify-center items-center gap-[5px]'>
            {!post.likes.includes(userData._id) && <GoHeart className='w-[30px] cursor-pointer h-[30px] ' onClick={handleLike} />}
            {post.likes.includes(userData._id) && <GoHeartFill className='w-[30px] cursor-pointer h-[30px] text-[#fe5252]' onClick={handleLike} />}
            <span >{post.likes.length}</span>
          </div>
          <div className='flex justify-center items-center gap-[5px] ' onClick={()=>setShowComment(prev=>!prev)}>
            < MdOutlineComment className='w-[30px] cursor-pointer h-[30px]' />
            <span>{post.comments.length}</span>
          </div>
        </div>



        {/* right icon for save   */}
        <div>
          {!userData.saved.includes(post?._id) && <MdOutlineBookmarkBorder className='w-[30px] cursor-pointer h-[30px]' />}
          {userData.saved.includes(post?._id) && <GoBookmarkFill className='w-[30px] cursor-pointer h-[30px]' />}
        </div>

      </div>

      {/* caption div  */}

      {post.caption &&
        <div className=' w-full px-[20px] gap-[10px] flex flex-col justify-start itemms-center '>
          <h1 className='text-2xl font-bold text-[#fe5252] '> {post.author?.userName} </h1>
          <div>
            {post.caption}

          </div>
        </div>
      }

      {showComment &&
        <div className='w-full flex flex-col gap-[30px] pb-[20px] '>
          <div className='w-full h-[80px] flex items-center justify-between px-[20px] relative '>
            <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2
          border-black rounded-full cursor-pointer overflow-hidden '>

              <img src={post.author?.profileImage || dp} alt="" className='w-full object-cover ' />

            </div>
            <input type="text" className='px-[10px] border-b-2 border-b-gray-500 w-[90%] outline-none h-[40px] '
              placeholder='Write your comment ' onChange={(e) => setMessage(e.target.value)} value={message} />
            <button className='absolute right-[20px] ' onClick={handleComment} >
              < IoSendSharp className='w-[30px] cursor-pointer h-[30px]' />
            </button>
          </div>
          <div className='w-full max-h[300px] overflow-auto '>

            {
              post.comments?.map((postcomment, index) => (
                <div key={index} className='w-full px-[20px] py-[20px] flex items-center gap-[20px] border-b-2
                  border-b-gray-200 '>

                  <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden '>

                    <img src={postcomment.author.profileImage || dp} alt="" className='w-full object-cover ' />

                  </div>
                  <div>{postcomment.message}</div>

                </div>
              ))
            }
          </div>

        </div>
      }









    </div>
  )
}

export default Post