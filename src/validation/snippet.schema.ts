import { z } from "zod";
import { VALIDATION_ERRORS } from "../constants";

export const snippetSchema = z.object({
  language: z.string().min(1),
  code: z.string().trim().min(1, VALIDATION_ERRORS.REQUIRED_CODE),
});

export type FormValues = z.infer<typeof snippetSchema>;
