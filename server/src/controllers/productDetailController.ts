import { Response, Request } from "express";
import { Product } from "../models/Product";

export const getProductBySlug = async (req: Request, res: Response) => {
  console.log(req.params);

  console.log(req.params.slug);
  try {
    const product = await Product.findOne({
      slug: req.params.slug,
      isDeleted: false,
    }).populate("categories");

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Increase views
    product.views = (product.views || 0) + 1;
    await product.save();

    // Related products
    const relatedProducts = await Product.find({
      categories: { $in: product.categories },
      _id: { $ne: product._id },
      isDeleted: false,
    })
      .limit(6)
      .populate("categories");

    return res.json({ product, relatedProducts });
  } catch (err) {
    return res.status(500).json({ message: "Error getting product", err });
  }
};
