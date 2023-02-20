import type { Actions, PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { cookiesOptions } from "$lib/constants";
import { googleAuth, justLogin } from "$db/users";
export const load = (async ({ cookies, url }: any) => {
  const __redirect__ = url.searchParams.get("r");
  let user = cookies.get("user");
  if (user) {
    user = JSON.parse(user);
    if (user?.object?.email) throw redirect(302, __redirect__ ?? "/");
  }
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  login: async ({ request, cookies }) => {
    const data = await request.formData();
    let email = data.get("email");
    let password = data.get("password");
    const res = await justLogin(email, password);
    if (res.status === 200) {
      cookies.set("user", JSON.stringify(res.user), cookiesOptions);
      return {
        success: true,
        message: res.message,
        user: { object: res.user },
      };
    } else {
      return {
        success: 2,
        user: false,
        message: res.message,
      };
    }
  },
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
