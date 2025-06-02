import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role === "admin") {
      req.user = decoded;
      return next();
    }
    return res.status(403).json({ message: "Admin access denied" });
  } catch {
    return res.status(403).json({ message: "Admin access denied" });
  }
};

export default adminAuth;
