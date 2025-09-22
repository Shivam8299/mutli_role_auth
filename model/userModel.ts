import mongoose, { Schema, Document, model } from "mongoose";

// Define allowed roles
export enum UserRole {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
}

// Define interface for TypeScript
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  _id: mongoose.Types.ObjectId;
}

// Create schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
  },
  { timestamps: true } 
);

const User = model<IUser>("User", UserSchema);

export default User;
