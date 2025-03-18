import {z} from "zod";
import {emptyAsNull} from "$lib/utils";


export const userPublicSchema = z.object({
    username: z.string().regex(/^[a-zA-Z0-9_]*$/, '|:var_name_only')
        .min(4, "|:too_short:4")
        .max(100, "|:too_long:100"),
    email: z.string().trim().transform(emptyAsNull).refine(
        (value) => {
            if (value === null) { return true; }
            return z.string().email().safeParse(value).success;
        },
        {message: "|:field_invalid"}
    ).nullable(),
    phone_no: z.string().trim().transform(emptyAsNull).refine(
        (value) => {
            if (value === null) { return true; }
            return /^\+?[1-9]\d{1,14}$/.test(value);
        },
        {message: "|:field_invalid"}
    ).nullable(),
    nickname: z.string(),
    avatar_path: z.string().optional(),
    real_name: z.string().optional(),
    gender: z.number().int().min(0).max(2).optional(),
    birthday: z.string().date().optional(),
    identity: z.string().optional(),
});

export type UserPublicSchema = z.infer<typeof userPublicSchema>;
export type UserPublicSchemaKey = keyof UserPublicSchema;

export const fullUserSchema = userPublicSchema.extend({
    email_public: z.boolean(),
    phone_no_public: z.boolean(),
    is_superuser_public: z.boolean(),
    real_name_public: z.boolean(),
    gender_public: z.boolean(),
    birthday_public: z.boolean(),
    identity_public: z.boolean(),
});

export type UserFullSchema = z.infer<typeof fullUserSchema>;
export type UserFullSchemaKey = keyof UserFullSchema;
