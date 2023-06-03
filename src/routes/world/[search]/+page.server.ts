import { getTrends } from "$db/server";
import type { PageServerLoad } from "./$types"
export const load = (async ({params}) => {
    const search = params.search
    const results = await getTrends(search)
    const stack:any = []
    results.firmwares.map((e:any)=> stack.push({...e, as:'firms'}))
    results.phones.map((e:any)=> stack.push({...e, as:'phones'}))
    results.laptops.map((e:any)=> stack.push({...e, as:'pcs'}))
    let __type__ = search === 'loved' ? 'loves' : search === 'trends' ? 'views' : 'rating' 
    const filter = stack.sort(function(a:any, b:any){
        if(b[__type__] > a[__type__]) return 1
        if(b[__type__] < a[__type__]) return -1
        if(b[__type__] < a[__type__]) return 0
    })
    return {
        result: filter,
        type:search
    }
}) satisfies PageServerLoad 