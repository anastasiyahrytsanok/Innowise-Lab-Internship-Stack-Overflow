import { z } from "zod";
import { VALIDATION_ERRORS } from "../constants";

export const questionSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  attachedCode: z.string().trim().min(1, VALIDATION_ERRORS.REQUIRED_CODE),
});

export type FormValues = z.infer<typeof questionSchema>;
