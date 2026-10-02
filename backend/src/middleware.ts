import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import "dotenv/config";

export function Middleware(req: Request,res: Response, next: NextFunction) 
{
    const auth = req.headers.authorization;
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!auth) {
        return res.status(401).json({
            message: "No token provided."
        });
    }

    if (!JWT_SECRET) {
        return res.status(500).json({
            message: "JWT_SECRET is not configured."
        });
    }

    const token = auth.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Invalid authorization header."
        });
    }

    const response = jwt.verify(token, JWT_SECRET);

    next();
}