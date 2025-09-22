import { Request, Response } from "express";
import Product from "../model/productModel.js";

// Add Product (Admin only)
export const addProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, description } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const product = await Product.create({ name, price, description });
    res.status(201).json({ message: "Product created", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Products
export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Get Single Product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

//  Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};
