import type { PageServerLoad } from "./$types";
import { getWatch } from "$db/phones";
import { error } from "@sveltejs/kit";
export const prerender = true;

export const load = (async ({ params }: any) => {
  const item: any = JSON.parse(
    JSON.stringify(await getWatch(params.category, params.watch))
  );
  if (item.watch == undefined) {
    throw error(404, {
      message: "Not found",
    });
  }
  return {
    category: params.category,
    slug: params.watch,
    watch: item.watch,
    categoryItems: item.categoryItems,
  };
}) satisfies PageServerLoad;
