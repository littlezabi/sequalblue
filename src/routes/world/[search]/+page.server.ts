import { getCategories, getTrends } from "$db/server";
import type { PageServerLoad } from "./$types"
export const prerender = true

export const load = (async ({params}) => {
    const search = params.search
    const results = await getTrends(search)
    return {
        results,
        type:search
    }
}) satisfies PageServerLoad 