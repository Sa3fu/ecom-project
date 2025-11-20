import Router from "express";
import { register, login } from "../controllers/authController";
import { logout } from "../controllers/logoutController";
import { validate } from "../middleware/validate";
import { loginSchema, registerSchema } from "../Validation/authSchema";
import { authLimiter } from "../middleware/rateLimit";

const router = Router();

router.use(authLimiter);
router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);

export default router;
