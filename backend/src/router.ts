import { Router } from "express";

import { register, login, refreshToken } from "./controllers/auth-controller";
import { validateRequest } from "./middlewares/validate-request";
import { createUserSchema } from "./schemas/create-user-schema";
import { loginSchema } from "./schemas/login-schema";
import { authenticate } from "./middlewares/auth-middleware";

const router = Router();

router.post("/user/register", validateRequest(createUserSchema), register);
router.post("/user/login", validateRequest(loginSchema), login);
router.get("/user/refresh", authenticate ,refreshToken);









export default router;
