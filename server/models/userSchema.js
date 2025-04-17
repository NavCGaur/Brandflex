import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  displayName: { type: String },
  photoURL: { type: String },
  role: {
    type: String,
    enum: ['Guest', 'Superadmin', 'Admin', 'Reseller', 'Agency', 'Client'],
    default: 'Guest'
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  createdAt: { type: Date, default: Date.now }
});

// Virtual field for children
UserSchema.virtual('children', {
  ref: 'User',
  localField: '_id',
  foreignField: 'parentId'
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

