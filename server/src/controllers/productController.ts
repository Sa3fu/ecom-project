import { Request, Response } from "express";
import { Product } from "../models/Product";

//Create Product (ADMIN)

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ message: "Error creating product", err });
  }
};

//Update Product (ADMIN)

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) return res.status(404).json({ message: "Product not found" });

    res.json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Error updating product", err });
  }
};

//Delete Product (ADMIN)

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Product not found" });

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting product", err });
  }
};

//Get All Product (PUBLIC)

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    return res.status(500).json({ message: "Error getting products", err });
  }
};

//Get Single Product (PUBLIC)

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (err) {
    return res.status(500).json({ message: "Error getting product", err });
  }
};
