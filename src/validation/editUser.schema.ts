import { z } from "zod";
import { VALIDATION_ERRORS } from "../constants";

export const changeNameSchema = z.object({
  newUsername: z
    .string()
    .trim()
    .min(5, VALIDATION_ERRORS.MIN_SYMBOLS_COUNT + 5),
});

export type ChangeNameFormValues = z.infer<typeof changeNameSchema>;

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().trim().min(1, VALIDATION_ERRORS.REQUIRED_FIELD),

    newPassword: z
      .string()
      .min(6, VALIDATION_ERRORS.MIN_SYMBOLS_COUNT + 6)
      .regex(/[A-Z]/, VALIDATION_ERRORS.UPPERCASE_LETTER)
      .regex(/[a-z]/, VALIDATION_ERRORS.LOWERCASE_LETTER)
      .regex(/\d/, VALIDATION_ERRORS.NUMBER)
      .regex(/[^A-Za-z0-9]/, VALIDATION_ERRORS.SYMBOL),

    confirmPassword: z.string().trim().min(1, VALIDATION_ERRORS.REQUIRED_FIELD),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: VALIDATION_ERRORS.PASSWORDS_DO_NOT_MATCH,
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
