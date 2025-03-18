import {type Actions, fail, redirect, type RequestEvent} from '@sveltejs/kit';
import {message, superValidate} from 'sveltekit-superforms/server';
import {zod} from "sveltekit-superforms/adapters";
import type {PageServerLoad} from "./$types";
import type {TranslationFunctions} from "$i18n/i18n-types";
import {loginSchema} from "$lib/schemas/user/login";
import {loginUser} from "$lib/server/user/functions"
import {CommonErrorWithStatus, ServerError} from "$lib/server/errors"
import {AxiosError} from "axios";


let LL: TranslationFunctions;

export const load: PageServerLoad = async (event: RequestEvent) => {
    if (event.locals.session !== null && event.locals.user !== null) {
        throw redirect(302, `/user/${event.locals.user.id}`);
    }
    LL = event.locals.LL;
    const form = await superValidate(zod(loginSchema));
    return {form};
};

export const actions: Actions = {
    default: async (event: RequestEvent) => {
        const form = await superValidate(event.request, zod(loginSchema));
        if (!form.valid) {
            return fail(400, {form});
        }

        try {
            await loginUser(form.data, event);
            return {form};
        } catch (e: any) {
            if (e instanceof AxiosError) {
                if (e.code === "ECONNREFUSED") {
                    return message(form, LL.common.errors.server({message: "ECONNREFUSED"}), {status: 500});
                }
            }
            if (e instanceof ServerError) {
                return message(form, LL.common.errors.server({message: e.status.toString()}), {status: 500});
            }
            if (e instanceof CommonErrorWithStatus) {
                if (e.status === 400 && e.detail?.code === "LOGIN_BAD_CREDENTIALS") {
                    return message(form, ":|bad_credentials", {status: 400});
                }
            }
            return fail(e.status, {form});
        }
    }
};