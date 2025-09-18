

import express from "express"
import isAuth from "../middleware/isAuth.js"
import { editProfile, follow, getCurrentUser, getProfile, suggestedUsers } from "../controllers/user_controllers.js"
import { upload } from "../middleware/multer.js"


const userRouter = express.Router()

userRouter.get("/current",isAuth,getCurrentUser)
userRouter.get("/suggested",isAuth,suggestedUsers)
userRouter.get("/getProfile/:userName",isAuth,getProfile)
userRouter.post("/editProfile",isAuth,upload.single("profileImage"),editProfile)
userRouter.get("/follow/:targetUserId",isAuth,follow)


export default userRouter