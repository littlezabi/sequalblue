import type { PageServerLoad } from "./$types";
import { error } from '@sveltejs/kit';
import { getWatches } from "$db/phones";
export const prerender = true

export const load = (async ({params, url}:any) => {
    const page = url.searchParams.get('p')
    const items:any = await getWatches(params.category, page)
    if (items.length === 0) {
        throw error(404, {
          message: 'Not found'
        });
      }
    return {
        items,
        cat: params.category,
        pageNo: page
    }
}) satisfies PageServerLoad