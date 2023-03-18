import type { PageServerLoad } from "./$types"
export const prerender = true
export const load:PageServerLoad = ({url})=>{
    return {}
}