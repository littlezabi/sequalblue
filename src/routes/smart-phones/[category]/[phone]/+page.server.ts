import type { PageServerLoad } from "./$types";
import {getPhone} from "$db/phones";

export const prerender = true

export const load = (async ({params}:any) => {
    const item:any = JSON.parse(JSON.stringify(await getPhone(params.category, params.phone)))
    console.log(item)
    return {
        category:params.category,
        slug:params.phone,
        phone: item.phone,
        categoryItems: item.categoryItems,
    }
}) satisfies PageServerLoad