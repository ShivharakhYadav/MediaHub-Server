import { Schema, model } from "mongoose";
const Types = Schema.Types;

const userSchema = new Schema({
    name: {
        type: Types.String,
        // required: [true, "name is required"]
    },
    username: {
        type: Types.String,
        // unique: [true, "{VALUE} can not be used."],
        required: [true, "username is Required"]
    },
    email: {
        type: Types.String,
        // unique: [true, "{VALUE} Already Used"],
        required: [true, "email is Required"]
    },
    password: {
        type: Types.String,
        // unique: [true, "{VALUE} Already Used"],
        required: [true, "password is Required"]
    },
    refreshToken: String,
    isVerified: {
        type: Schema.Types.Boolean,
        default: false,
    },
    verification: {
        type: Schema.Types.Mixed,
        required: false,
    }
})

export default model("users", userSchema);
