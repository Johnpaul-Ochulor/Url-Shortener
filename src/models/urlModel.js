import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    // Feature 1 & 4: Store original long URL
  originalUrl: {
    type: String,
    required: true,
  },
  // Feature 1, 2, & 5: The unique code (Random or Custom)
  shortCode: {
    type: String,
    required: true,
    unique: true,
  },
  // Feature 3: Analytics tracking
  clickCount: {
    type: Number,
    required: true,
    default: 0,
  },
  // Feature 3: Timestamp of creation
  createdAt: {
    type: Date,
    default: Date.now,
  },
   // Feature 3: Optional tracking of the last visit
  lastAccessed: {
    type: Date,
    default: null
  },
  // Feature 6: Expiration date logic
  expiresAt: {
    type: Date,
    default: null, // null means it never expires unless set
  },
  isActive: {
  type: Boolean,
  default: true, // Links are active by default
},
});


// Exporting the model using ESM
const Url = mongoose.model('Url', urlSchema);
export default Url;