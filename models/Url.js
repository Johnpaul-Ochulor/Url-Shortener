import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  clickCount: {
    type: Number,
    required: true,
    default: 0,
  },
  expiresAt: {
    type: Date,
    default: null, // null means it never expires unless set
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the model using ESM
const Url = mongoose.model('Url', urlSchema);
export default Url;