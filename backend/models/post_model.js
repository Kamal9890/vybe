import mongoose from "mongoose";



const postSchema = new mongoose.Schema({

    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    mediaType: {
        type: String,
        enum: ["image", "video"],
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




}, { timestamps: true })


const Post = mongoose.model("Post",postSchema)
export default Post