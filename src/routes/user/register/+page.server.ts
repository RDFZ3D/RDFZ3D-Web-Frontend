import {type Actions, fail} from '@sveltejs/kit';
import {setError, superValidate} from 'sveltekit-superforms/server';
import {zod} from "sveltekit-superforms/adapters";
import type {PageServerLoad} from "./$types";
import type {TranslationFunctions} from "$i18n/i18n-types";

import {createRegisterSchema, type RegisterSchemaKey} from "$lib/server/user/schema";
import {CommonErrorWithStatus, ValidationError} from "$lib/server/errors"
import {registerUser} from "$lib/server/user/functions";

let registerSchema: ReturnType<typeof createRegisterSchema>;
let LL: TranslationFunctions;

export const load: PageServerLoad = async ({locals: {LL: _LL}}) => {
    LL = _LL;
    registerSchema = createRegisterSchema(LL);
    const form = await superValidate(zod(registerSchema));
    return {form};
};

export const actions: Actions = {
    default: async ({request}) => {
        const form = await superValidate(request, zod(registerSchema));
        if (!form.valid) {
            return fail(400, {form});
        }

        try {
            form.data = await registerUser(form.data);
            return {form};
        } catch (e: any) {
            if (e instanceof CommonErrorWithStatus && e.status === 400 && e.detail?.code === "USER_ALREADY_EXISTS") {
                return setError(form, e.detail.identifier as RegisterSchemaKey,
                    LL.user.validations.user_exists({field: LL.user[e.detail.identifier as RegisterSchemaKey]()}));
            } else if (e instanceof ValidationError && e.detail[0].loc[1] === "phone_no") {
                return setError(form, "phone_no",
                    LL.common.validations.field_invalid({field: LL.user.phone_no()}));
            }
            return fail(e.status, {form});
        }
    }
};