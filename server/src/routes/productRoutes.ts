import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "../controllers/productController";
import { authMiddleware } from "../middleware/authMiddleware";
import { verifyRole } from "../middleware/verifyRole";

const router = Router();

//Public Routes
router.get("/:id", getProductById);

//Admin Routes
router.post("/", authMiddleware, verifyRole("admin"), createProduct);
router.post("/:id", authMiddleware, verifyRole("admin"), updateProduct);
router.post("/delete/:id", authMiddleware, verifyRole("admin"), deleteProduct);

export default router;
