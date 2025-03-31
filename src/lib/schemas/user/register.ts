import { z } from "zod";
import { emptyAsNull } from "$lib/utils";

export const registerSchema = z
  .object({
    username: z
      .string()
      .regex(/^[a-zA-Z0-9_]*$/, "|:var_name_only")
      .min(4, "|:too_short:4")
      .max(100, "|:too_long:100"),
    email: z
      .string()
      .trim()
      .transform(emptyAsNull)
      .refine(
        (value) => {
          if (value === null) {
            return true;
          }
          return z.string().email().safeParse(value).success;
        },
        { message: "|:field_invalid" },
      )
      .nullable(),
    phone_no: z
      .string()
      .trim()
      .transform(emptyAsNull)
      .refine(
        (value) => {
          if (value === null) {
            return true;
          }
          return /^\+?[1-9]\d{1,14}$/.test(value);
        },
        { message: "|:field_invalid" },
      )
      .nullable(),
    password: z.string().min(3, "|:too_short:3"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "|:password_mismatch",
    path: ["confirm_password"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
export type RegisterSchemaKey = keyof RegisterSchema;
