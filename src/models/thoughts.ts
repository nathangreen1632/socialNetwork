import mongoose from "mongoose";

const reactionSchema = new mongoose.Schema({
  reactionBody: { type: String, required: true },
  username: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { type: String, required: true },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Thought", thoughtSchema);
