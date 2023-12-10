import { Schema, model } from "mongoose";

const postSchema = new Schema({
    postMedia: Array,
    like: {
        default: 0,
        type: Number
    },
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
