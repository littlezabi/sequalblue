import { getBlogs } from "$db/server";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
export const load = (async ({url}) => {
  const page = Number(url.searchParams.get("p")) ?? 0;
  const blogs = await getBlogs(page)
  if (blogs.length === 0) {
    throw error(404, {
      message: "Not found",
    });
  }
  return { blogs, pageNo:page };
}) satisfies PageServerLoad;
