import { homeViewObjects } from "$db/server";
import { cookiesOptions } from "$lib/constants";
import type { PageServerLoad } from "./$types";
export const prerender = true;
export const load = (async () => {
  const { phones, computers } = await homeViewObjects({
    phones: 1,
    computers: 1,
});
return {
    phones,
    computers,
  };
}) satisfies PageServerLoad;
