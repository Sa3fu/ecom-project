import { Response, Request } from "express";
import { Category } from "../models/Category";
import { slugify } from "../utils/slugify";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const slug = slugify(name);

    const exists = await Category.findOne({ slug });
    if (exists)
      return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name, slug });
    res.json(category);
  } catch (err) {
    return res.status(500).json({ message: "Error creating category", err });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const slug = slugify(name);

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, slug },
      { new: true }
    );

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json(category);
  } catch (error) {
    return res.status(500).json({ message: "Error updating category", error });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );

    if (!category)
      return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting category", err });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const category = await Category.find({ isDelete: false });
    res.json(category);
  } catch (error) {
    return res.status(500).json({ message: "Error getting categories", error });
  }
};
