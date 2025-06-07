import { type Actions, fail, type RequestEvent } from "@sveltejs/kit";
import { setError, superValidate, withFiles } from "sveltekit-superforms/server";
import { zod } from "sveltekit-superforms/adapters";
import type { PageServerLoad } from "./$types";
import type { TranslationFunctions } from "$i18n/i18n-types";

import { CommonErrorWithStatus } from "$lib/server/errors";
import { uploadAvatar } from "$lib/server/user/functions";
import { returnMessageIfServerError } from "$lib/server/utils";
import { changeAvatarSchema } from "$lib/schemas/user/changeAvatar";

let LL: TranslationFunctions;

export const load: PageServerLoad = async (event: RequestEvent) => {
  LL = event.locals.LL;
  const form = await superValidate({}, zod(changeAvatarSchema));
  return { form };
};

//上传头像表单，后端有文件校验，这里就不校验了
//也不使用
export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();

    // Why should I do this?????
    const form = await superValidate(
      {
        avatar_file: formData.get("avatar_file") as File,
      },
      zod(changeAvatarSchema),
    );

    if (!form.valid) {
      return fail(400, withFiles({ form }));
    }

    try {
      const success = await uploadAvatar(form.data, event);
      if (!success) {
        return fail(400, withFiles({ form }));
      }
    } catch (e: any) {
      const serverErrorMsg = returnMessageIfServerError(e, LL, form);
      if (serverErrorMsg) return serverErrorMsg;
      console.log(e);
      if (e instanceof CommonErrorWithStatus) {
        if (e.status === 415) {
          return setError(form, "avatar_file", "|:unsupported_file_type");
        }
      }

      console.error("Upload error:", e);
      return fail(500, withFiles({ form }));
    }

    return withFiles({ form });
  },
};
