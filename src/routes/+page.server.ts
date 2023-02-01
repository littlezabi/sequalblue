import { homeViewObjects } from "$db/server";
import type { PageServerLoad } from "./$types"
export const prerender = true
export const load = (async ({params}) => {
    const {phones, computers} = await homeViewObjects({phones: 1, computers: 1})
    return {
        phones, computers
    }
}) satisfies PageServerLoad 