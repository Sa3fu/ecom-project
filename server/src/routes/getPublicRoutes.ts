import express from "express";
import { getPublicProducts } from "../controllers/publicProductController";
import { getProductBySlug } from "../controllers/productDetailController";

const router = express.Router();

router.get("/", getPublicProducts);
router.get("/:slug", getProductBySlug);

export default router;
