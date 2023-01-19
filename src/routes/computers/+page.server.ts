// import { getCategories } from "$db/categories"
import { categoriesModal } from "$db/models";
import { getPcCategories } from "$db/server";
import type { PageServerLoad } from "./$types"
export const prerender = true

export const load = (async () => {
    const categories = await getPcCategories()
    return {
        categories: JSON.parse(JSON.stringify(categories))
    }
}) satisfies PageServerLoad 