import { z } from "zod";
import { emptyAsNull } from "$lib/utils";

export const userPublicSchema = z.object({
  username: z
    .string()
    .regex(/^[a-zA-Z0-9_]*$/, "|:var_name_only")
    .min(4, "|:too_short:4")
    .max(100, "|:too_long:100"),
  // email: z.string().trim().transform(emptyAsNull).refine(
  //     (value) => {
  //         if (value === null) { return true; }
  //         return z.string().email().safeParse(value).success;
  //     },
  //     {message: "|:field_invalid"}
  // ).nullable(),
  email: z.preprocess(emptyAsNull, z.string().trim().email("|:field_invalid").nullable()),
  phone_no: z.preprocess(
    emptyAsNull,
    z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{1,14}$/, "|:field_invalid")
      .nullable(),
  ),
  nickname: z.string().min(1, "|:required").max(24, "|:too_long:24"),
  avatar_path: z.string(),
  real_name: z.preprocess(emptyAsNull, z.string().trim().max(24, "|:too_long:24").nullable()),
  gender: z.literal(0).or(z.literal(1)).or(z.literal(2)).nullable(),
  birthday: z.preprocess(emptyAsNull, z.string().date().nullable()),
  identity: z.preprocess(emptyAsNull, z.string().nullable()),
});

export type UserPublicSchema = z.infer<typeof userPublicSchema>;
export type UserPublicSchemaKey = keyof UserPublicSchema;

export const userFullSchema = userPublicSchema.extend({
  email_public: z.boolean(),
  phone_no_public: z.boolean(),
  is_superuser_public: z.boolean(),
  real_name_public: z.boolean(),
  gender_public: z.boolean(),
  birthday_public: z.boolean(),
  identity_public: z.boolean(),
});

export type UserFullSchema = z.infer<typeof userFullSchema>;
export type UserFullSchemaKey = keyof UserFullSchema;
