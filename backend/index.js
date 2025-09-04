import express from 'express'
import dotenv from "dotenv"
import connectDb from './config/db.js'
import cookieParser from 'cookie-parser'
import cors from "cors"
import authRouter from './routes/auth_route.js'
import userRouter from './routes/user_routes.js'
import postRouter from './routes/post_routes.js'
import loopRouter from './routes/loop_routes.js'
import storyRouter from './routes/story_routes.js'

const app = express()
dotenv.config()

const port = process.env.PORT || 5000

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true

}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRouter)
app.use('/api/user',userRouter)
app.use('/api/post',postRouter)
app.use("/api/loop",loopRouter)
app.use("/api/story",storyRouter)



app.listen(port,()=>{
    connectDb()
    console.log("Server started successfully");
    
})






