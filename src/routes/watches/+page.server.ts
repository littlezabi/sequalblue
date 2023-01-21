import { getCategories } from "$db/server";
import type { PageServerLoad } from "./$types"
export const prerender = true

export const load = (async () => {
    return {
        categories: await getCategories('watches')
    }
}) satisfies PageServerLoad 