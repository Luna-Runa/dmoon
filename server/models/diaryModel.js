import mongoose from "mongoose";

const diarySchema = new mongoose.Schema({
    mood: {
        type: String,
        required: true
    },

    todoBool: {
        type: Boolean
    },

    todoText: {
        type: String
    },

    date: {
        type: String
    }
},
    { versionKey: false });

const Diary = mongoose.model("diary", diarySchema);

export default Diary;