import db from "$db/database";
import { itemPerPage, sideBarRandomPostsLength } from "$lib/constants";
const collection = db.collection("mobile_devices");

export const getPhone = async (category: string, slug: string) => {
  return {
    phone: (await collection.find({ slug: slug, isActive: true }, {projection: {_id: 0}}).toArray())[0],
    categoryItems: await collection
      .aggregate([
        { $match: { category: category, isActive: true } },
        { $sample: { size: sideBarRandomPostsLength } },
        { $project: { _id: 0, image: 1, isNew: 1, name: 1, slug: 1 } },
      ])
      .toArray(),
  };
};

export const countPhones = async (category: string) => {
  return await collection.countDocuments({ category, isActive: true });
};

export const getPhones = async (category: string, page: number) => {
  page = page === 1 ? 0 : page;
  const skip: number = (page > 1 ? page - 1 : page) * itemPerPage;
  return await collection
    .find(
      { category, isActive: true },
      {
        projection: { _id: 0, image: 1, isNew: 1, name: 1, slug: 1 },
        limit: itemPerPage,
        skip: skip,
      }
    )
    .toArray();
};
