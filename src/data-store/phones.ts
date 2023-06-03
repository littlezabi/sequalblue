import db from "$db/database";
import {
  itemPerPage,
  sideBarRandomPostsLength,
} from "$lib/constants";
import { smartModel } from "./models";
await db.connect();
const getItemProjection = {
  _id: 0,
  image: 1,
  isNew: 1,
  title: 1,
  slug: 1,
};
export const countPhones = async (category: string|null) => {
  return await smartModel.countDocuments({ category, isActive: true });
};
export const getPhone = async (category: string, slug: string) => {
  await smartModel.updateOne({slug}, {$inc:{views:1}})
  return {
    phone: (
      await smartModel.findOne({ slug: slug }, { _id: 0})
    ),
    categoryItems: await smartModel.aggregate([
      { $match: { category: category } },
      { $sample: { size: sideBarRandomPostsLength } },
      { $project: getItemProjection },
    ]),
  };
};
export const getPhones = async (category: string, page: number) => {
  page = page === 1 ? 0 : page;
  const skip: number = (page > 1 ? page - 1 : page) * itemPerPage;
  const data = await smartModel
    .find({ category }, { _id: 0, image: 1, title: 1, slug: 1, views: 1  })
    .skip(skip)
    .limit(itemPerPage)
    .lean();
  return data;
};
