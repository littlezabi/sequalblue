import { homeViewObjects } from "$db/server";
import type { PageServerLoad } from "./$types";
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
