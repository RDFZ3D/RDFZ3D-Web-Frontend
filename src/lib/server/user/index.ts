import type {UserFullSchema} from "$lib/schemas/user/user";

export interface User extends UserFullSchema {
    id: string,
}
