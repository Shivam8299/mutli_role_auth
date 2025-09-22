import express from "express";
import { UserRole } from "../model/userModel.js";
import { protect, authorizeRoles } from "../middleware/auth.js";
import { addProduct, updateProduct, deleteProduct, getProducts } from "../controllers/product.js";

const productRouter = express.Router();

// Public route
productRouter.get("/", getProducts);

// Admin-only routes
productRouter.post("/", protect, authorizeRoles(UserRole.ADMIN), addProduct);
productRouter.put("/:id", protect, authorizeRoles(UserRole.ADMIN), updateProduct);
productRouter.delete("/:id", protect, authorizeRoles(UserRole.ADMIN), deleteProduct);

productRouter.patch("/:id", protect, authorizeRoles(UserRole.ADMIN || UserRole.MODERATOR), updateProduct);

export default productRouter;

