import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // For admin, you can check email or a special flag
        if (decoded && decoded.id === process.env.ADMIN_ID) {
            next();
        } else {
            res.status(403).json({ message: "Admin access denied" });
        }
    } catch {
        res.status(403).json({ message: "Admin access denied" });
    }
};

export default adminAuth;
