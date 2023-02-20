import type { Actions, PageServerLoad } from "../$types";
import { redirect } from "@sveltejs/kit";
export const load = (() => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  signout: async ({ url, cookies }) => {
    console.log('signinout')
    const __redirect__ = url.searchParams.get("r");
    cookies.delete("user");
    throw redirect(302, __redirect__ ?? "/sign-in");
  },
};
