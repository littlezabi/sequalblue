import {getReviews} from '$db/reviews-db'

export const GET = async ({request, url})=>{
    if(url.searchParams.get('post_slug')){
        const reviews = await getReviews(url.searchParams.get('post_slug'))
        console.log('revew: ', reviews)
        return new Response(JSON.stringify({reviews}), {status: 200})
    }
    return new Response(JSON.stringify({request: 'empty'}), {status: 403})

}