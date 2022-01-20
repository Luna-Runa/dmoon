import mongoose from "mongoose";

const diarySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
    },

    mood: {
      type: String,
      required: true,
    },

    todoArray: {
      type: [{ todoBool: Boolean, todoText: String }],
      default: undefined,
    },

    date: String,

    likes: Number,
  },
  { versionKey: false }
);

const Diary = mongoose.model("diary", diarySchema);

export default Diary;
