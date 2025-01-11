import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";
import { jwtConfig } from "../config/jwt-config";

export interface CustomJwtPayload extends JwtPayload {
  userId: number;
  email: string;
}

const JwtService = {
  generateToken: (payload: CustomJwtPayload): string => {
    const options: SignOptions = {
      expiresIn: jwtConfig.expiresIn,
    };
    return jwt.sign(payload, jwtConfig.secret, options);
  },

  verifyToken: (token: string): CustomJwtPayload => {
    try {
      const decoded = jwt.verify(token, jwtConfig.secret) as CustomJwtPayload;
      return decoded;
    } catch (error) {
      throw new Error("Invalid or expired token");
    }
  },
};

export { JwtService };
