import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);
