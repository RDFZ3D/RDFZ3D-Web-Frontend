import type { RequestEvent } from "@sveltejs/kit";
import type { LoginSchema } from "$lib/schemas/user/login";
import type { RegisterSchema } from "$lib/schemas/user/register";
import { requestWrapped, requestWrappedForFile } from "$lib/server/utils";
import type { User } from "$lib/server/user";
import { validateSessionToken } from "$lib/server/session/functions";
import { deleteSessionTokenCookie, setSessionTokenCookie } from "$lib/server/session/utils";
import type { UserFullSchema } from "$lib/schemas/user/user";

export const registerUser = async (form: RegisterSchema) => {
  const response = await requestWrapped("/user/register", "POST", undefined, JSON.stringify(form));
  console.info("registerUser", response.data);
  return response.data as RegisterSchema;
};

export const getUser = async (user_id?: string, token?: string) => {
  if (!user_id) user_id = "me";
  const response = await requestWrapped(`/user/${user_id}`, "GET", token);
  return (await response.data) as User;
};

export const loginUser = async (form: LoginSchema, event: RequestEvent) => {
  const response = await requestWrapped("/auth/login", "POST", undefined, JSON.stringify(form));
  const token = response.data.access_token;

  const { session, user } = await validateSessionToken(token);
  if (!session) throw new Error("Unexpected Error in loginUser!");

  setSessionTokenCookie(event, token, session.expires);

  console.info("loginUser", response.data);
  return { session, user };
};

export const logoutUser = async (event: RequestEvent) => {
  if (!event.locals.session) return false;
  // const response = await request("/auth/logout", "POST", event.locals.session.access_token);
  await requestWrapped("/auth/logout", "POST", event.locals.session.access_token);
  deleteSessionTokenCookie(event);
  return true;
};

export const patchMe = async (form: Partial<UserFullSchema>, event: RequestEvent) => {
  const response = await requestWrapped(
    "/user/me",
    "PATCH",
    event.locals.session?.access_token,
    JSON.stringify(form),
  );
  return response.data as UserFullSchema;
};

//新增上传头像功能 2025.6.7 by StrayMeteor3337
//
export const uploadAvatar = async (
  form: {
    avatar_file: File;
  },
  event: RequestEvent,
) => {
  const formData = new FormData();
  formData.append("avatar_file", form.avatar_file, form.avatar_file.name);
  await requestWrappedForFile(
    "/user/upload_avatar",
    "POST",
    event.locals.session?.access_token,
    formData,
  );
  return true;
};

export const changePassword = async (
  form: { old_password: string; new_password: string },
  event: RequestEvent,
) => {
  await requestWrapped(
    "/auth/change-password",
    "POST",
    event.locals.session?.access_token,
    JSON.stringify(form),
  );
  return true;
};
