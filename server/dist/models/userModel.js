import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    goal: {
        type: String,
        required: false,
    },
    friends: {
        type: Array,
        required: false,
    },
}, { versionKey: false });
const User = mongoose.model("User", userSchema);
export default User;
