import mongoose from "mongoose";


const loopSchema = new mongoose.Schema({
    autor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
    
        media: {
            type: String,
            require: true
        },
        caption: {
            type: String
            
        },
    
        like:[ {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        comments:[ {
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }]
    
    
},{timestamps:true})

const Loop = mongoose.model("Loop",loopSchema)

export default Loop