import React, { useRef, useState } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'

const VideoPlayer = ({ media }) => {

    const videoTag = useRef()
    const [mute, setMute] = useState(true)
    const [isPlaying, setIsplaying] = useState(true)


    const handleClick = () => {
        if (isPlaying) {
            videoTag.current.pause()
            setIsplaying(false)

        }

        else {
            videoTag.current.play()
            setIsplaying(true)

        }
    }
    return (
        <div className='h-[100%] relative cursor-pointer max-w-full rounded-2xl overflow-hidden '>

            <video ref={videoTag} src={media} autoPlay loop muted={mute} className='max-h-[500px] w-full cursor-pointer w-full rounded-2xl
         object-cover' onClick={handleClick}/>
                <div className='absolute bottom-[10px] right-[10px] ' onClick={() => setMute(prev => !prev)}>
                    {!mute ? <FiVolume2 className='w-[30px] h-[30px] text-white fomt-semibold ' />
                        : <FiVolumeX className='w-[30px] h-[30px] text-white font-semibold ' />}
                </div>
           

        </div>
    )
}

export default VideoPlayer