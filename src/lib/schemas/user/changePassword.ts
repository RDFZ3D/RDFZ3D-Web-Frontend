import { z } from "zod";

export const changePasswordSchema = z.object({
  old_password: z.string(),
  new_password: z
    .string()
    .regex(/^[a-zA-Z0-9_]*$/, "|:ascii_only")
    .min(3, "|:too_short:3")
    .max(100, "|:too_long:100"),
});

export type ChangePasswordSchema = z.infer<typeof changePasswordSchema>;
export type ChangePasswordSchemaKey = keyof ChangePasswordSchema;
