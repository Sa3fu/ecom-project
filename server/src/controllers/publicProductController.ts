import { Request, Response } from "express";
import { Product } from "../models/Product";

export const getPublicProducts = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      category,
      sort = "latest",
      minPrice,
      maxPrice,
    } = req.query as any;

    //Pagination
    const skip = (Number(page) - 1) * Number(limit);

    //Filter Object
    const filter: any = {
      isDeleted: false,
    };

    //Search by name or description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Category Filter
    if (category) {
      filter.categories = category;
    }

    //Price Filter
    if (maxPrice || minPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    //Sorting
    const sortOption: any = {};

    switch (sort) {
      case "price-low-high":
        sortOption.price = 1;
        break;
      case "price-high-low":
        sortOption.price = -1;
        break;
      case "latest":
        sortOption.createdAt = -1;
        break;
      default:
        sortOption.createdAt = -1;
    }

    //Query
    const products = await Product.find(filter)
      .populate("categories")
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(filter);

    res.json({ products, total, page: Number(page), limit: Number(limit) });
  } catch (err) {
    res.status(500).json({ message: "Error getting products", err });
  }
};
