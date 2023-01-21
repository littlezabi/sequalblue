import { categoriesModal } from "$db/models";
import { homeViewObjects } from "$db/server";
import type { PageServerLoad } from "./$types"
export const prerender = true

export const load = (async () => {
    const {phones, computers} = JSON.parse(JSON.stringify(await homeViewObjects({phones: 1, computers: 1})))
    return {
        phones, computers
    }
}) satisfies PageServerLoad 