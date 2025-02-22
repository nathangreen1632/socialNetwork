import mongoose from 'mongoose';

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    reactions: [],
  },
  { timestamps: true }
);

export default mongoose.model('Thought', thoughtSchema);
