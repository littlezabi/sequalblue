import type { Actions, PageServerLoad } from "./$types";
import { googleAuth } from "$db/users";
import { redirect } from "@sveltejs/kit";
import { cookiesOptions } from "$lib/constants";
export const load = (async ({ url, cookies }: any) => {
  const __redirect__ = url?.searchParams.get("r");
  let user = cookies.get("user") ?? false;
  if (user) {
    user = JSON.parse(user);
    if (user?.object.email) throw redirect(302, __redirect__ ?? "/");
  }
  return { __redirect__ };
}) satisfies PageServerLoad;
 
export const actions: Actions = {
  google: async ({ request, cookies }) => {
    const data = await request.formData();
    let credential: any = data.get("credential");
    credential = JSON.parse(
      Buffer.from(credential.split(".")[1], "base64").toString()
    );
    const email = credential.email;
    const firstname = credential.given_name;
    const lastname = credential.family_name;
    const avatar = credential.picture;
    try {
      const { success, message, user } = await googleAuth({
        firstname,
        lastname,
        avatar,
        email,
      });
      if (success) {
        cookies.set("user", JSON.stringify(user), cookiesOptions);
      }
      return { success, message, user };
    } catch (e) {
      return { success: 2, message: "Error: " + e, user: {} };
    }
  },
};
