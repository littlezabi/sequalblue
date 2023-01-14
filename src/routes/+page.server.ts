import type { PageServerLoad } from "./smart-phones/$types";
import {getCategories} from "$db/categories";

export const prerender = true


export const load = (async ({params}:any) => {
    const items = [{a: 1, b:2}, {a: 3, b: 4}]
    console.log()
    return {
        message: "hello world",
        items
    }
}) satisfies PageServerLoad