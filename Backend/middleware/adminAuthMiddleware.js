import jwt, { decode } from "jsonwebtoken";

export const adminAuthMiddleware = (req, res, next) => {
  try {

    const token = req.headers.authorization;
    console.log(req.headers.authorization);
    console.log(token);
    
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    
    if (decoded.role !== "Admin")
      return res.status(403).json({ message: "Forbidden: Admins only" });

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
