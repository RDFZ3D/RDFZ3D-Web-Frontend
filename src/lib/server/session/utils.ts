import type { RequestEvent } from "@sveltejs/kit";

export const setSessionTokenCookie = (event: RequestEvent, token: string, expires: Date) => {
  event.cookies.set("session", token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    expires: expires,
  });
};

export const deleteSessionTokenCookie = (event: RequestEvent) => {
  event.cookies.delete("session", {
    path: "/",
  });
};
