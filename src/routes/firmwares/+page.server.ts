import { getFirmCat } from "$db/server"
import type { PageServerLoad } from "./$types"
export const load = (async () => {
    return {
        items: await getFirmCat()
    }
}) satisfies PageServerLoad 