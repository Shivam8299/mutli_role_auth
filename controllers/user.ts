import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { UserRole } from "../model/userModel.js";

// Generate JWT token
const generateToken = (id: string, role: UserRole) => {
  const secret = process.env.JWT_SECRET || "secret";
  return jwt.sign({ id, role }, secret, { expiresIn: "1h" });
};

// Register user
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if(!name || !email || !password || !role){
      return res.status(400).json({
        success:false,
        message: "all feilds are required"
      })
    }

    if(password.length < 8){
      return res.status(400).json({
        success:false,
        message: "password must be 8 characters long"
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || UserRole.USER,
    });

    const token = generateToken(user._id.toString() || user.id, user.role);

    res.status(201).json({
      message: "User registered",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id.toString(), user.role);

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
      token,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ 
      message: "Server error", error 
    });
  }
};


 