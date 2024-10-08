import { getCategories } from "$db/server";
import type { PageServerLoad } from "./$types"
export const load = (async () => {
    return {
        categories: await getCategories('phones')
    }
}) satisfies PageServerLoad 