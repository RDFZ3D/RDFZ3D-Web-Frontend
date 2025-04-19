import { z } from "zod";
import { emptyAsNull } from "$lib/utils";

export const registerSchema = z
  .object({
    username: z
      .string()
      .regex(/^[a-zA-Z0-9_]*$/, "|:var_name_only")
      .min(4, "|:too_short:4")
      .max(100, "|:too_long:100"),
    email: z.preprocess(emptyAsNull, z.string().trim().email("|:field_invalid").nullable()),
    phone_no: z.preprocess(
      emptyAsNull,
      z
        .string()
        .trim()
        .regex(/^\+?[1-9]\d{1,14}$/, "|:field_invalid")
        .nullable(),
    ),
    password: z
      .string()
      .regex(/^[a-zA-Z0-9_]*$/, "|:ascii_only")
      .min(3, "|:too_short:3")
      .max(100, "|:too_long:100"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "|:password_mismatch",
    path: ["confirm_password"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterSchemaKey = keyof RegisterSchema;
