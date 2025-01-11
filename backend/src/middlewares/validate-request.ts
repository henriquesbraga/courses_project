import { z, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {

      if (error instanceof z.ZodError) {

        const errors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));


        res.status(400).json({
          error: "Validation error",
          details: errors,
        });
        return; // Finaliza o fluxo
      }
    }
  };
