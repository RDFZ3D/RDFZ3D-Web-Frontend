import type { TranslationFunctions } from "$i18n/i18n-types";
import { fail, type RequestEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { setError, superValidate } from "sveltekit-superforms/server";
import { zod4 } from "sveltekit-superforms/adapters";
import { userFullSchema } from "$lib/schemas/user/user";
import { returnMessageIfServerError } from "$lib/server/utils";
import { changePassword } from "$lib/server/user/functions";
import { CommonErrorWithStatus, ErrorWithStatus } from "$lib/server/errors";
import { changePasswordSchema } from "$lib/schemas/user/changePassword";

let LL: TranslationFunctions;

export const load: PageServerLoad = async (event: RequestEvent) => {
  LL = event.locals.LL;
  const form = await superValidate(event.locals.user, zod4(userFullSchema));
  const changePasswordForm = await superValidate(zod4(changePasswordSchema));
  return { form, changePasswordForm };
};

export const actions = {
  changePassword: async (event: RequestEvent) => {
    const form = await superValidate(event.request, zod4(changePasswordSchema));
    if (!form.valid) {
      return fail(400, { form });
    }
    try {
      await changePassword(form.data, event);
    } catch (e: any) {
      const serverErrorMsg = returnMessageIfServerError(e, LL, form);
      if (serverErrorMsg) return serverErrorMsg;
      if (e instanceof CommonErrorWithStatus) {
        if (e.status === 400) {
          if (e.detail?.code === "WRONG_PASSWORD")
            return setError(form, "old_password", "|:password_incorrect");
        }
      }
      return fail(e.status, { form });
    }
    return { form };
  },
};
