import { type Actions, fail, type RequestEvent } from "@sveltejs/kit";
import { message, setError, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { AxiosError } from "axios";
import type { PageServerLoad } from "./$types";
import type { TranslationFunctions } from "$i18n/i18n-types";

import { CommonErrorWithStatus, ServerError, ValidationError } from "$lib/server/errors";
import { userFullSchema, type UserFullSchemaKey } from "$lib/schemas/user/user";
import { patchMe } from "$lib/server/user/functions";
import { returnMessageIfServerError } from "$lib/server/utils";

let LL: TranslationFunctions;

export const load: PageServerLoad = async (event: RequestEvent) => {
  LL = event.locals.LL;
  const form = await superValidate(event.locals.user, zod(userFullSchema));
  return { form };
};

export const actions: Actions = {
  default: async (event) => {
    const form = await superValidate(event.request, zod(userFullSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      Object.assign(form.data, await patchMe(form.data, event));
    } catch (e: any) {
      const serverErrorMsg = returnMessageIfServerError(e, LL, form);
      if (serverErrorMsg) return serverErrorMsg;
      if (
        e instanceof CommonErrorWithStatus &&
        e.status === 400 &&
        e.detail?.code === "USER_ALREADY_EXISTS"
      ) {
        return setError(form, e.detail.identifier as UserFullSchemaKey, "|:user_exists");
      } else if (e instanceof ValidationError && e.detail[0].loc[1] === "phone_no") {
        return setError(form, "phone_no", "|:field_invalid");
      }
      return fail(e.status, { form });
    }
    // await loginUser(form.data, event);
    return { form };
  },
};
