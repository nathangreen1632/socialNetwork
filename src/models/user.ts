import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
