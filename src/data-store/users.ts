import db from '$db/database'

const collection = db.collection('users')

export const checkUsername = async (username:string) => {
    const isExist = await collection.find({username}, {
        projection: {username: 1, _id: 0}
    }).toArray()
    return isExist.length
}