import mongoose from "mongoose";

const memberSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['ADMIN', 'MODERATOR', 'GUEST'],
    default: 'GUEST'
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  server: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Server'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
});


const Member = mongoose.models.Member || mongoose.model("Member", memberSchema);

export default Member;
