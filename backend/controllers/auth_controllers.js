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

        const isMatch =  bcrypt.compare(password,user.password)

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