import express from "express"
import isAuth from "../middleware/isAuth.js"

import { upload } from "../middleware/multer.js"
import {  commentLoops, getAllLoops, likeLoops, uploadLoop } from "../controllers/loop_controllers.js"



const loopRouter = express.Router()

loopRouter.post("/upload",isAuth,upload.single("media"),uploadLoop)
loopRouter.get("/getAll",isAuth,getAllLoops)
loopRouter.get("/like/:loopId",isAuth,likeLoops)

loopRouter.post("/comment",isAuth,commentLoops)


export default loopRouter