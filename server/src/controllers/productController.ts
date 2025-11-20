import { Request, Response } from "express";
import { Product } from "../models/Product";
import { Category } from "../models/Category";
import { slugify } from "../utils/slugify";

//Create Product (ADMIN)

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, categories, stock, images } = req.body;
    const exists = await Category.find({ _id: { $in: categories } });
    if (exists.length !== categories.length) {
      return res.status(400).json({ message: "Invalid categories" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const product = await Product.create({
      name,
      description,
      price,
      categories,
      slug,
      stock,
      images,
    });

    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: "Error creating product", err });
  }
};

//Update Product (ADMIN)

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updates = { ...req.body };

    if (updates.name) {
      updates.slug = slugify(updates.name, { lower: true, strict: true });
    }

    const update = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!update) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json(update);
  } catch (err) {
    return res.status(500).json({ message: "Error updating product", err });
  }
};

//Delete Product (ADMIN)

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      isDeleted: true,
      new: true,
    });

    if (!product) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting product", err });
  }
};

//Get Single Product (PUBLIC)

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id, {
      isDelete: false,
    }).populate("categories");

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: "Error getting product", err });
  }
};
