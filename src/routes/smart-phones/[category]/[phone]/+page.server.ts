import type { PageServerLoad } from "./$types";
import {getPhone} from "$db/phones";
import { error } from "@sveltejs/kit";
export const load = (async ({params}:any) => {
    const item:any = JSON.parse(JSON.stringify(await getPhone(params.category, params.phone)))
    if (item.phone == undefined) {
        throw error(404, {
          message: "Not found",
        });
      }
    return {
        category:params.category,
        slug:params.phone,
        phone: item.phone,
        categoryItems: item.categoryItems,
    }
}) satisfies PageServerLoad