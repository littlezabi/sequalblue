import db from "$db/database";
const col_name = 'categories'
export async function getCategories(type: string) {
  const col = db.collection(col_name);
  const data = await col.find({type:type}, {projection: {_id:0, type: 0,image: 0}}).toArray();
  return data;
}
