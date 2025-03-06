import type {LoginSchema, RegisterSchema} from "$lib/server/user/schema";
import {request} from "$lib/server/utils";
import type {User} from "$lib/server/user";
import {validateSessionToken} from "$lib/server/session/functions";
import {deleteSessionTokenCookie, setSessionTokenCookie} from "$lib/server/session/utils";
import type {RequestEvent} from "@sveltejs/kit";


export const registerUser = async (form: RegisterSchema) => {
    const {result} = await request("/user/register", "POST", undefined, JSON.stringify(form))
    return result as RegisterSchema;
};


export const getUser = async (user_id?: string, token?: string) => {
    if (!user_id) user_id = "me";
    const {result} = await request(`/user/${user_id}`, "GET", token);
    return await result as User;
};

export const loginUser = async (form: LoginSchema, event: RequestEvent) => {
    const {result} = await request("/auth/login", "POST", undefined, JSON.stringify(form))
    const token = result.access_token;

    const {session, user} = await validateSessionToken(token);
    if (!session) throw new Error("Unexpected Error in loginUser!");

    setSessionTokenCookie(event, token, session.expires);

    return {session, user};
}

export const logoutUser = async (event: RequestEvent) => {
    if (!event.locals.session) return false;
    await request("/auth/logout", "GET", event.locals.session.access_token);
    deleteSessionTokenCookie(event);
    return true;
}
