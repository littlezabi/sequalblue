import { getFirmCat } from "$db/server"
import type { PageServerLoad } from "./$types"
export const prerender = true

export const load = (async () => {
    return {
        items: await getFirmCat()
    }
}) satisfies PageServerLoad 