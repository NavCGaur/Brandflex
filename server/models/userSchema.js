import mongoose from "mongoose";
export const UserSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    displayName: { type: String },
    photoURL: { type: String },
    role: { type: String, enum: ['user', 'admin', 'reseller','agency','client'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
  });
  
  