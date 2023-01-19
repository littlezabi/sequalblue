import type { PageLoad } from './$types';
 
export const load = (({ params, url }) => {
    const __redirect__ = url.searchParams.get('r')
    return {
        __redirect__
    }
}) satisfies PageLoad;