import type { RequestEvent } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { logoutUser } from "$lib/server/user/functions";

export const load: PageServerLoad = async (event: RequestEvent) => {
  const logoutState = await logoutUser(event);
  return { logoutState };
};
