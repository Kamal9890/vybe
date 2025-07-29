import mongoose from "mongoose"

const connectDb = async()=> {
    try {
       await mongoose.connect(process.env.MONGO_URL)
       console.log("connect to db");
       
    } catch (error) {

        console.log("errror");
        
        
    }
    
}

export default connectDb