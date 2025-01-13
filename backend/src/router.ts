import { Router } from "express";

import {
  registerEndpoint,
  getUserInfoEndpoint,
  loginEndpoint,
  refreshTokenEndpoint,
  getAllUsersWithHisCoursesEndpoint,
} from "./controllers/auth-controller";
import { validateRequest } from "./middlewares/validate-request";
import { createUserSchema } from "./schemas/create-user-schema";
import { loginSchema } from "./schemas/login-schema";
import { authenticate } from "./middlewares/auth-middleware";
import {
  createCourseEndpoint,
  getAllCoursesEndpoint,
  enrollUserToCourseEndpoint,
  getAllCoursesByUserIdEndpoint,
} from "./controllers/course-controller";
import { createCourseSchema } from "./schemas/create-course-schema";
import { enrollUserToCourseSchema } from "./schemas/enroll-user-to-course-schema";

const router = Router();

// User routes
router.post("/users", validateRequest(createUserSchema), registerEndpoint);
router.get("/users/all", authenticate, getAllUsersWithHisCoursesEndpoint);
router.get("/users/:id", authenticate, getUserInfoEndpoint);


// Auth routes
router.post("/login", validateRequest(loginSchema), loginEndpoint);
router.get("/refresh", authenticate, refreshTokenEndpoint);

// Courses routes
router.post("/courses", validateRequest(createCourseSchema), authenticate, createCourseEndpoint);
router.get("/courses", authenticate, getAllCoursesEndpoint);

// Enrollments
router.post("/enrollments", validateRequest(enrollUserToCourseSchema), authenticate, enrollUserToCourseEndpoint);
router.get("/enrollments/:userId", authenticate, getAllCoursesByUserIdEndpoint);

export default router;
