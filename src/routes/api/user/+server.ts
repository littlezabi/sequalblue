import {checkUsername} from '$db/users'

export const GET = async ({request, url})=>{
    if(url.searchParams.get('is-user-exist')){
        const isExist = await checkUsername(url.searchParams.get('is-user-exist'))
        return new Response(JSON.stringify({isExist}), {status: 200})
    }
    return new Response(JSON.stringify({request: 'empty'}), {status: 403})

}