import { Router } from "express";

import { register } from "./controllers/user-controller";
import { validateRequest } from "./middlewares/validate-request";
import { createUserSchema } from "./schemas/create-user-schema";

const router = Router();

router.post("/user/register", validateRequest(createUserSchema), register);

export default router;
