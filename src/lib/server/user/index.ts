import type {FullUserSchema} from "$lib/server/user/schema";

export interface User extends FullUserSchema {
    id: string,
}
