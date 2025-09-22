import express, { Router } from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js"
import userRouter from "./routes/user.js"
import productRouter from "./routes/product.js"

import type { Application, Request, Response } from "express";

dotenv.config();

//calling database

connectDb()

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use("/api", userRouter)
app.use("/product", productRouter)

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Node + TypeScript + ESM 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
