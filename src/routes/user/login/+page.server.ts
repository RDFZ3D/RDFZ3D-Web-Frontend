import { type Actions, fail, redirect, type RequestEvent } from "@sveltejs/kit";
import { message, superValidate } from "sveltekit-superforms/server";
import { zod4 } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import type { TranslationFunctions } from "$i18n/i18n-types";
import { loginSchema } from "$lib/schemas/user/login";
import { loginUser } from "$lib/server/user/functions";
import { CommonErrorWithStatus, ServerError } from "$lib/server/errors";
import { returnMessageIfServerError } from "$lib/server/utils";

let LL: TranslationFunctions;

export const load: PageServerLoad = async (event: RequestEvent) => {
  if (event.locals.session !== null && event.locals.user !== null) {
    throw redirect(302, `/user/profile/info`);
  }
  LL = event.locals.LL;
  const form = await superValidate(zod4(loginSchema));
  return { form };
};

export const actions: Actions = {
  default: async (event: RequestEvent) => {
    const form = await superValidate(event.request, zod4(loginSchema));
    if (!form.valid) {
      return fail(400, { form });
    }

    try {
      await loginUser(form.data, event);
      return { form };
    } catch (e: any) {
      const serverErrorMsg = returnMessageIfServerError(e, LL, form);
      if (serverErrorMsg) return serverErrorMsg;
      if (e instanceof CommonErrorWithStatus) {
        if (e.status === 400 && e.detail?.code === "LOGIN_BAD_CREDENTIALS") {
          return message(form, "|:bad_credentials", { status: 400 });
        }
      }
      return fail(e.status, { form });
    }
  },
};
