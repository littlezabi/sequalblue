import {countPhones} from '$db/phones'

export const GET = async ({request, url})=>{
    let count = 0
    if(url.searchParams.get('phones')){
        count = await countPhones(url.searchParams.get('category'))
        console.log('counter: ', count)
    }

    return new Response(JSON.stringify({__count__:count}), {status: 200})
}