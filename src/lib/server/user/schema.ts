import type {TranslationFunctions} from "$i18n/i18n-types";
import {z} from "zod";

export const createRegisterSchema = (LL: TranslationFunctions) =>
    z.object({
        username: z.string().regex(/^[a-zA-Z0-9_]*$/, '用户名只能包含字母、数字和下划线')
            .min(4, LL.common.validations.too_short({field: LL.user.username(), min_length: 4}))
            .max(100, LL.common.validations.too_long({field: LL.user.username(), max_length: 100})),
        email: z.string().email(LL.common.validations.field_invalid({field: LL.user.email()})).optional(),
        phone_no: z.string().regex(/^\+?[1-9]\d{1,14}$/, LL.common.validations.field_invalid({field: LL.user.phone_no()})).optional(),
        password: z.string().min(3, LL.common.validations.too_short({field: LL.user.password(), min_length: 3})),
        confirm_password: z.string(),
    }).refine((data) => data.password === data.confirm_password, {
        message: LL.user.validations.password_mismatch(),
        path: ["confirm_password"]
    });

export type RegisterSchema = z.infer<ReturnType<typeof createRegisterSchema>>;
export type RegisterSchemaKey = keyof RegisterSchema;

export const createLoginSchema = (LL: TranslationFunctions) =>
    z.object({
        username: z.string(),
        password: z.string(),
    });

export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;
export type LoginSchemaKey = keyof LoginSchema;

export const createPublicUserSchema = (LL: TranslationFunctions) =>
    z.object({
        username: z.string().regex(/^[a-zA-Z0-9_]*$/, '用户名只能包含字母、数字和下划线')
            .min(4, LL.common.validations.too_short({field: LL.user.username(), min_length: 4}))
            .max(100, LL.common.validations.too_long({field: LL.user.username(), max_length: 100})),
        email: z.string().email(LL.common.validations.field_invalid({field: LL.user.email()})).optional(),
        phone_no: z.string().regex(/^\+?[1-9]\d{1,14}$/, LL.common.validations.field_invalid({field: LL.user.phone_no()})).optional(),
        nickname: z.string(),
        avatar_path: z.string().optional(),
        real_name: z.string().optional(),
        gender: z.number().int().min(0).max(2).optional(),
        birthday: z.string().date().optional(),
        identity: z.string().optional(),
    });

export type PublicUserSchema = z.infer<ReturnType<typeof createPublicUserSchema>>;
export type PublicUserSchemaKey = keyof PublicUserSchema;

export const createFullUserSchema = (LL: TranslationFunctions) =>
    createPublicUserSchema(LL).extend({
        email_public: z.boolean(),
        phone_no_public: z.boolean(),
        is_superuser_public: z.boolean(),
        real_name_public: z.boolean(),
        gender_public: z.boolean(),
        birthday_public: z.boolean(),
        identity_public: z.boolean(),
    })

export type FullUserSchema = z.infer<ReturnType<typeof createFullUserSchema>>;
export type FullUserSchemaKey = keyof FullUserSchema;
