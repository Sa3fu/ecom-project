import mongoose, { Schema, Document } from "mongoose";
import { slugify } from "../utils/slugify";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  categories: Schema.Types.ObjectId[];
  slug: string;
  stock: number;
  images: string[];
  views: number;
  isDeleted: boolean;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    categories: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],
    slug: { type: String, unique: true },
    stock: { type: Number, default: 0 },
    images: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate slug
productSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();

  this.slug = slugify(this.name, { lower: true, strict: true });
  next();
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
