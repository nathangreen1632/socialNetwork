import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  reactionBody: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Reaction", reactionSchema);