import { Schema, Types } from 'mongoose';

const formatTimestamp = (timestamp: Date) => timestamp.toISOString();

const reactionSchema = new Schema(
  {
    reactionId: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 255 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, get: formatTimestamp }
  },
  {
    toJSON: { getters: true },
    id: false
  }
);

export { reactionSchema };