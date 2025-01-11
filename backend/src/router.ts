import { Router } from "express";

import {
  register,
  login,
  refreshToken,
  getUserInfo,
} from "./controllers/auth-controller";
import { validateRequest } from "./middlewares/validate-request";
import { createUserSchema } from "./schemas/create-user-schema";
import { loginSchema } from "./schemas/login-schema";
import { authenticate } from "./middlewares/auth-middleware";

const router = Router();

router.post("/users", validateRequest(createUserSchema), register);
router.get("/users/:id", authenticate, getUserInfo);
router.post("/login", validateRequest(loginSchema), login);
router.get("/refresh", authenticate, refreshToken);

export default router;
