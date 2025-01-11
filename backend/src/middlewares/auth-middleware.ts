import { Request, Response, NextFunction } from "express";
import { JwtService } from "../services/jwt-service";

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "Token não informado" });
    return;
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = JwtService.verifyToken(token);
    req.user = { userId: decoded.userId, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido ou expirado" });
    return;
  }
};
