import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./utils/connectDB";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/authRoutes";
import refreshRoutes from "./routes/refreshRoutes";
import productRoutes from "./routes/productRoutes";
import userRouter from "./routes/userRoutes";
import categoryRoutes from "./routes/categoriesRoutes";
import getPublicRoutes from "./routes/getPublicRoutes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(errorHandler);
app.use("/auth", authRoutes);
app.use("/auth", refreshRoutes);
app.use("/users", userRouter);
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/product", getPublicRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectDB();
});
