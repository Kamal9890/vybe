import express from "express"
import { logout, resetPassword, sendOtp, signIn, signup, verifyOtp } from "../controllers/auth_controllers.js"

const authRouter = express.Router()

authRouter.post('/signup',signup)
authRouter.post('/signin',signIn)
authRouter.get('/logout',logout)
authRouter.post('/sendOtp',sendOtp)
authRouter.post('/verifyOtp',verifyOtp)
authRouter.post('/resetPassword',resetPassword)



export default authRouter