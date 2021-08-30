import mongoose from "mongoose";

const notesSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      min: 5,
      required: true,
    },
    description: {
      type: String,
      min: 5,
      required: true,
    },
    categoury: {
      type: String,
      min: 4,
      required: true,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
const Notes = mongoose.model("Notes", notesSchema);
export default Notes;
