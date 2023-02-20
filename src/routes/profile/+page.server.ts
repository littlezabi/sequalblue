import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load:PageServerLoad = async ({cookies})=>{
    const user:any = cookies.get('user') ?? false
    if(!user) throw redirect(302, '/sign-in')
    return{
        user:JSON.parse(user).object
    }
}