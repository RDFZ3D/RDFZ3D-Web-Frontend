import {type Actions, fail, redirect, type RequestEvent} from '@sveltejs/kit';
import {setError, superValidate} from 'sveltekit-superforms/server';
import {zod} from "sveltekit-superforms/adapters";
import type {PageServerLoad} from "./$types";
import type {TranslationFunctions} from "$i18n/i18n-types";

import {createLoginSchema, type LoginSchemaKey} from "$lib/server/user/schema";
import {loginUser} from "$lib/server/user/functions"
import {CommonErrorWithStatus, ValidationError} from "$lib/server/errors"

let loginSchema: ReturnType<typeof createLoginSchema>;
let LL: TranslationFunctions;

export const load: PageServerLoad = async (event: RequestEvent) => {
    console.log(event.locals.session, event.locals.user)
    if (event.locals.session !== null && event.locals.user !== null) {
        throw redirect(302, `/user/${event.locals.user.id}`);
    }
    LL = event.locals.LL;
    loginSchema = createLoginSchema(LL);
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
            if (e instanceof CommonErrorWithStatus && e.status === 400 && e.detail?.code === "LOGIN_BAD_CREDENTIALS") {
                return setError(form, "password", LL.user.validations.bad_credentials());
            }
            return fail(e.status, {form});
        }
    }
};