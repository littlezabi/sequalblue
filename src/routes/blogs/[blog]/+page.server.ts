import { getBlog } from "$db/server";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const slug = params.blog;
  const { blog, related ,author} = await getBlog(slug);
  console.log(related);
  return { slug, blog, related,author };
}) satisfies PageServerLoad;