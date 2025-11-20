import mongoose, { Schema, Document } from "mongoose";

interface ICategory extends Document {
  name: string;
  slug: string;
  isDelete: boolean;
}

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isDelete: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Category = mongoose.model<ICategory>("Category", categorySchema);
