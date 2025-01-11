const { JWT_SECRET } = process.env;



export const jwtConfig = {
  secret: JWT_SECRET!,
  expiresIn: "1h",
};