import { z } from "zod";

export const changeAvatarSchema = z.object({
  avatar_file: z
    .instanceof(File, { message: "|:required" })
    .refine((f) => f.size < 2 * 1024 * 1024, "|:file_too_large:2 MB"),
});

export type ChangeAvatarSchema = z.infer<typeof changeAvatarSchema>;
export type ChangeAvatarSchemaKey = keyof ChangeAvatarSchema;
