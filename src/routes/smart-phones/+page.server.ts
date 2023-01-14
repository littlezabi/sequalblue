import { getCategories } from "$db/categories"
import type { PageServerLoad } from "./$types"
export const prerender = true

export const load = (async ({params}:any) => {
    const categories = await getCategories('phone')
    return {
        categories: JSON.parse(JSON.stringify(categories))
    }
}) satisfies PageServerLoad 