import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret = "mysecretkey";

interface DecodedToken {
    userId: string;
}

export const checkAuth = async (req: Request & { userId?: string }, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            next();
        } else {
            const decoded = jwt.verify(token, secret) as DecodedToken;
            req.userId = decoded.userId;
            next();
        }
    } catch (error) {
        res.status(401).json({ message: "Token invalido" });
    }
};
