import db from '$db/database'

const collection = db.collection('reviews')

export const getReviews = async (postSlug:string) => {
    return await collection.find({post_id:postSlug}, {
        projection: {username: 1, _id: 0, review: 1, country:1, createdAt:1}
    }).toArray()
}