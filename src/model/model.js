const { Schema, model } = require("mongoose");
const Types = Schema.Types;
const userSchema = new Schema({
    name: {
        type: Types.String,
        required: [true, "name is required"]
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
    }
})

module.exports = model("users", userSchema);
