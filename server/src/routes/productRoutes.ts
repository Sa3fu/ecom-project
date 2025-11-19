import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productController";
import { authMiddleware } from "../middleware/authMiddleware";
import { verifyRole } from "../middleware/verifyRole";

const router = Router();

//Public Routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

//Admin Routes
router.post("/", authMiddleware, verifyRole("admin"), createProduct);
router.post("/:id", updateProduct);
router.post("/delete/:id", deleteProduct);

export default router;
