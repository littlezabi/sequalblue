import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getPhones } from "$db/phones";
import { itemPerPage } from "$lib/constants";
import { laptopsModal } from "$db/models";
import { computerCatItems } from "$db/server";
export const prerender = true;

export const load = (async ({ params, url }: any) => {
  const page = url.searchParams.get("p");
  const items = await computerCatItems(params.category, page)
  if (items.length === 0) {
    throw error(404, {
      message: "Not found",
    });
  }
  return {
    items: JSON.parse(JSON.stringify(items)),
    cat: params.category,
    pageNo: page,
  };
}) satisfies PageServerLoad;
