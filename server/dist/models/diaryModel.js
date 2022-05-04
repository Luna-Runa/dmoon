import mongoose from "mongoose";
const diarySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    mood: {
        type: String,
        required: true,
    },
    todoBool: {
        type: Boolean,
    },
    todoText: {
        type: String,
    },
    date: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
}, { versionKey: false });
const Diary = mongoose.model("diary", diarySchema);
export default Diary;
