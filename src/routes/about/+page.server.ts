import type { PageServerLoad } from "./$types"
export const load = (({params}:any) => {
    const items = [{a: 1, b:2}, {a: 3, b: 4}]
    return {
        message: "hello world",
        items
    }
}) satisfies PageServerLoad 