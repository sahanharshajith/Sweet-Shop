import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "No token, authorization denied" });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await userModel.findById(decoded.id).select("-password");
        next();
    } catch (err) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default auth;