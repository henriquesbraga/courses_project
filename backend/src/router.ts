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
import { createCourseEndpoint, getAllCoursesEndpoint } from "./controllers/course-controller";
import { createCourseSchema } from "./schemas/create-course-schema";

const router = Router();

// User routes
router.post("/users", validateRequest(createUserSchema), register);
router.get("/users/:id", authenticate, getUserInfo);

// Auth routes
router.post("/login", validateRequest(loginSchema), login);
router.get("/refresh", authenticate, refreshToken);

// Courses routes
router.post("/courses", validateRequest(createCourseSchema), authenticate, createCourseEndpoint);
router.get("/courses", authenticate, getAllCoursesEndpoint);



export default router;
