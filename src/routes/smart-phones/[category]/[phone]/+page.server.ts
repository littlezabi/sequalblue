import type { PageServerLoad } from "./$types";
import {getPhones} from "$db/phones";

export const prerender = true

export const load = (async ({params, url}:any) => {
    const page = url.searchParams.get('p')
    const items:any = JSON.parse(JSON.stringify(await getPhones(params.category, page)))
    return {
        items,
        cat: params.category,
        pageNo: page
    }
}) satisfies PageServerLoad