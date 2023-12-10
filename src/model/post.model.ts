import { Schema, model } from "mongoose";

const postSchema = new Schema({
    username: String,
    userid: String,
    postMedia: Array,
    like: Number,
    comment: Array,
    caption: String,
    location: String,
    uploadTime: Number,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

export default model("posts", postSchema);
