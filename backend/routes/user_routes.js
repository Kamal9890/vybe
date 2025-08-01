

import express from "express"
import isAuth from "../middleware/isAuth.js"
import { getCurrentUser, suggestedUsers } from "../controllers/user_controllers.js"


const userRouter = express.Router()

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.get("/suggested",isAuth,suggestedUsers)


export default userRouter