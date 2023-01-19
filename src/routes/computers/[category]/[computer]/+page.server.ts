import type { PageServerLoad } from "./$types";
import {getPhone} from "$db/phones";
import { laptopsModal } from "$db/models";
import { getComputer } from "$db/server";

export const prerender = true

export const load = (async ({params}:any) => {
    const item:any = await getComputer(params.computer,params.category)
    return {
        category:params.category,
        slug: params.computer,
        computer: JSON.parse(JSON.stringify(item.computers)),
        categoryItems: JSON.parse(JSON.stringify(item.categoryItems)),
    }
}) satisfies PageServerLoad