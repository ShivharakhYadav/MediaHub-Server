const { Schema, model } = require("mongoose");
const Types = Schema.Types;
const userSchema = new Schema({
    name: {
        type: Types.String,
        required:[true,"name is required"]
    },
    username: {
        type: Types.String,
        unique: [true, "{VALUE} can not be used."],
        required: [true, "Username is Required"]
    }
})