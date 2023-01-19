import { categoriesModal } from "$db/models";
import type { PageServerLoad } from "./$types"
export const prerender = true

export const load = (async () => {
    const categories: any = await categoriesModal.find(
        { type: 'phone' },
        { _id: 0, type: 0, image: 0 }
      );
    return {
        categories: JSON.parse(JSON.stringify(categories))
    }
}) satisfies PageServerLoad 