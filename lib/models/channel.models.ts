import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ['TEXT', 'AUDIO', 'VIDEO'],
    default: 'TEXT'
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

const Channel = mongoose.models.Channel || mongoose.model('Channel', channelSchema);
export default Channel;
