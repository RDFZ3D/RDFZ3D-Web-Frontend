import { type Actions, fail, redirect, type RequestEvent } from "@sveltejs/kit";
import { message, setError, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { AxiosError } from "axios";
import type { PageServerLoad } from "./$types";
import type { TranslationFunctions } from "$i18n/i18n-types";

import { CommonErrorWithStatus, ServerError, ValidationError } from "$lib/server/errors";
import { registerSchema, type RegisterSchemaKey } from "$lib/schemas/user/register";
import { loginUser, registerUser } from "$lib/server/user/functions";
import { returnMessageIfServerError } from "$lib/server/utils";

let LL: TranslationFunctions;

export const load: PageServerLoad = async (event: RequestEvent) => {
  if (event.locals.session !== null && event.locals.user !== null) {
    throw redirect(302, `/user/${event.locals.user.id}`);
  }
  LL = event.locals.LL;
  const form = await superValidate(zod(registerSchema));
  return { form };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event.request, zod(registerSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      Object.assign(form.data, await registerUser(form.data));
    } catch (e: any) {
      const serverErrorMsg = returnMessageIfServerError(e, LL, form);
      if (serverErrorMsg) return serverErrorMsg;
      if (
        e instanceof CommonErrorWithStatus &&
        e.status === 400 &&
        e.detail?.code === "USER_ALREADY_EXISTS"
      ) {
        return setError(form, e.detail.identifier as RegisterSchemaKey, "|:user_exists");
      } else if (e instanceof ValidationError && e.detail[0].loc[1] === "phone_no") {
        return setError(form, "phone_no", "|:field_invalid");
      }
      return fail(e.status, { form });
    }
    await loginUser(form.data, event);
    return { form };
  },
};
