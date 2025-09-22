import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { UserRole, IUser } from "../model/userModel.js";

interface JwtPayload {
  id: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: IUser;
}

// Protect routes with JWT
export const protect = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      const secret = process.env.JWT_SECRET || "secret"; // use strong secret in production
      const decoded = jwt.verify(token, secret) as JwtPayload;

      const user = await User.findById(decoded.id).select("-password");
      if (!user) {
        res.status(401).json({ message: "Not authorized" });
        return;
      }

      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Token is not valid", error });
    }
  } else {
    res.status(401).json({ message: "No token, authorization denied" });
  }
};

// Middleware to check roles
export const authorizeRoles = (...roles: UserRole[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access forbidden: insufficient role" });
    }
    next();
  };
};
