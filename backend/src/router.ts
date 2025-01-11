import { Router } from "express";

import { register, login } from "./controllers/auth-controller";
import { validateRequest } from "./middlewares/validate-request";
import { createUserSchema } from "./schemas/create-user-schema";
import { loginSchema } from "./schemas/login-schema";

const router = Router();

router.post("/user/register", validateRequest(createUserSchema), register);
router.post("/user/login", validateRequest(loginSchema), login);

export default router;
