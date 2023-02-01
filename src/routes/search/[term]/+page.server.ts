
import { searchTermIn } from "$db/server"
import type { PageServerLoad } from "./$types"
export const prerender = true
export const load = (async ({params})=>{
    const res = await searchTermIn(params.term)
    return {
        res
    }
}) satisfies PageServerLoad 