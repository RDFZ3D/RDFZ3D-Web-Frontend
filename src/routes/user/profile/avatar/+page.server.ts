import { type Actions, fail, type RequestEvent } from "@sveltejs/kit";
import { message, setError, superValidate } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import { AxiosError } from "axios";
import type { PageServerLoad } from "./$types";
import type { TranslationFunctions } from "$i18n/i18n-types";
import { z } from "zod";

import { CommonErrorWithStatus, ServerError, ValidationError } from "$lib/server/errors";
import { userFullSchema, type UserFullSchemaKey } from "$lib/schemas/user/user";
import { patchMe, uploadAvatar } from "$lib/server/user/functions";
import { returnMessageIfServerError } from "$lib/server/utils";

let LL: TranslationFunctions;

export const load: PageServerLoad = async (event: RequestEvent) => {
  LL = event.locals.LL;
  const form = await superValidate(event.locals.user, zod(userFullSchema));
  return { form };
};

//上传头像表单，后端有文件校验，这里就不校验了
//也不使用
export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();

    try {
      const result = await uploadAvatar(formData, event);
      return { success: true, data: result };
    } catch (e: any) {
      return fail(500, { error: e.message });
    }
    // await loginUser(form.data, event);
    //return { form };
  },
};
