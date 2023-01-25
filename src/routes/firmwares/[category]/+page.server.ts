import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { getFirmAndFolders } from "$db/server";
export const prerender = true;

export const load = (async ({ params, url }: any) => {
  const page = url.searchParams.get("p");
  const { folders, firms } = await getFirmAndFolders(params.category, page);
  console.log('length: ', folders.length, firms.length)
  if (folders.length === 0 && firms.length === 0) {
    throw error(404, {
      message: "Not found",
    });
  }
  return {
    folders,
    firms,
    cat: params.category,
    pageNo: page,
  };
}) satisfies PageServerLoad;
