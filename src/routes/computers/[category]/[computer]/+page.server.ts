import type { PageServerLoad } from "./$types";
import { getComputer } from "$db/server";
import { error } from "@sveltejs/kit";
export const load = (async ({params}:any) => {
    const item:any = JSON.parse(JSON.stringify(await getComputer(params.computer,params.category)))
    if (item.computers == undefined) {
        throw error(404, {
          message: "Not found",
        });
      }
    return {
        category:params.category,
        slug: params.computer,
        computer: item.computers,
        categoryItems: item.categoryItems,
    }
}) satisfies PageServerLoad