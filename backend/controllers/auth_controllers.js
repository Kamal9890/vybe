import sendMail from "../config/mail.js"
import genToken from "../config/token.js"
import User from "../models/user_model.js"
import bcrypt from "bcrypt"


export const signup = async(req,res)=>{

    try {

        const {name,email,password,userName} = req.body

        const findByEmail = await User.findOne({email})

        if(findByEmail)
        {
            return res.status(400).json({message : "Email already exist !"})
        }

        if(password.length<6)
        {
            return res.status(400).json({message : "Password must be 6 charecters"})
        }


        const findByUserName = await User.findOne({userName})

        if(findByUserName)
        {
            return res.status(400).json({message : "UserName already exist !"})
        }

        const hashedPassowrd = await bcrypt.hash(password,10)


        const user = await User.create({
            name,
            userName,
            email,
            password: hashedPassowrd
        })

        const token= await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:10*365*24*60*60*1000,
            secure:false,
            sameSite:"Strict"

        })

        return res.status(201).json(user)


        
    } catch (error) {
        return res.status(500).json({message:`sign error,${error}`})
    }

}




export const signIn = async(req,res)=>{

    try {

        const {password,userName} = req.body

        const user = await User.findOne({userName})

        if(!user)
        {
            return res.status(400).json({message : "User not found !"})
        }

        const isMatch =  await bcrypt.compare(password,user.password)

        if(!isMatch)
        {
             return res.status(400).json({message : "Incorrect password or username "})

        }




        const token= await genToken(user._id)

        res.cookie("token",token,{
            httpOnly:true,
            maxAge:10*365*24*60*60*1000,
            secure:false,
            sameSite:"Strict"

        })

        return res.status(200).json(user)


        
    } catch (error) {
        return res.status(500).json({message:`signIn error,${error}`})
    }

}


export const logout = async (req,res)=>{
    try {

        res.clearCookie("token")
        return res.status(200).json({message:"logout out successfully"})
        
    } catch (error) {
         return res.status(500).json({message:`logut error,${error}`})
    }
}


// send otp

export const sendOtp = async (req,res) => {

    try {
        const {email} = req.body
        const user = await User.findOne({email})

        if(!user)
    {
        return res.status(400).json({message:"User not found "})
        }


        // otp jana hai
        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        user.resetOtp=otp,
        user.otpExpires= Date.now ()+ 5*60*1000
        
        user.isOtpVerified = false
        await user.save()


       // mail jaiyega 
       await  sendMail(email,otp)

       return res.status(200).json({message:"Email Successfully send "})




    } catch (error) {
        return res.status(400).json({message:`send otp ${error}`})
    }
    
}



// verify otp 


export const verifyOtp = async (req,res) => {

    try {
        const {email,otp} =req.body
        const user = await User.findOne({email})


        if(!user || user.resetOtp!==otp || user.otpExpires < Date.now())
        
        {

            return res.status(400).json({message:"Invalid/ expired otp"})
        }

        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires= undefined

        await user.save()

         return res.status(200).json({message:"Otp Verified "})

    } catch (error) {

         return res.status(500).json({message:`verify otp ${error}`})
        
    }
    
}



// password reset 

export const resetPassword = async (req,res) => {

    try {

        const {email,password} = req.body

         const user = await User.findOne({email})

         if(!user || !user.isOtpVerified)
         {
            return res.status(400).json({ message:"Otp Verification required"})
         }

         const hashedPassword = await bcrypt.hash(password,10)

         user.password= hashedPassword
         user.isOtpVerified=false
         await user.save()


    return res.status(200).json({message:"Password reset successfully "})
        
    } catch (error) {
         return res.status(500).json({message:`reset otp ${error}`})
    }
    
}