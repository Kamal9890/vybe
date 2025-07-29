import express from "express"
import { logout, signIn, signup } from "../controllers/auth_controllers.js"

const authRouter = express.Router()

authRouter.post('/signup',signup)
authRouter.post('/signin',signIn)
authRouter.get('/logout',logout)



export default authRouter