import type { Session } from "$lib/server/session";
import type { User } from "$lib/server/user";
import { getUser } from "$lib/server/user/functions";
import { CommonErrorWithStatus } from "$lib/server/errors";

export const validateSessionToken = async (token: string) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 2);
  // TODO: validate session (backend)
  const session: Session = {
    access_token: token,
    expires: expireDate,
  };
  try {
    const user: User = await getUser(undefined, token);
    return { session, user };
  } catch (e) {
    if (e instanceof CommonErrorWithStatus && e.status === 401)
      return { session: null, user: null };
    else throw e;
  }
};
