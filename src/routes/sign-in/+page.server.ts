import type { PageServerLoad } from "./$types";
export const prerender = true


export const load = (async ({params, url}:any) => {
    const __redirect__ = url.searchParams.get('r')
    return {
        __redirect__
    }
}) satisfies PageServerLoad