import { Router } from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
} from "../controllers/categoryController";
import { authMiddleware } from "../middleware/authMiddleware";
import { verifyRole } from "../middleware/verifyRole";

const router = Router();

//Public Routes
router.get("/", getAllCategories);

//Admin Routes
router.post("/", authMiddleware, verifyRole("admin"), createCategory);
router.post("/:id", authMiddleware, verifyRole("admin"), updateCategory);
router.post("/delete/:id", authMiddleware, verifyRole("admin"), deleteCategory);

export default router;
