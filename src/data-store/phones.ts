import db from "$db/database";
import {
  itemPerPage,
  sideBarRandomPostsLength,
} from "$lib/constants";
import { smartModal, watchesModal } from "./models";
await db.connect();
const getItemProjection = {
  _id: 0,
  image: 1,
  isNew: 1,
  name: 1,
  slug: 1,
};
export const getWatch = async (category: string, slug: string) => {
  await watchesModal.updateOne({slug}, {$inc:{hits:1}})
  return {
    watch: (await watchesModal.findOne({ slug: slug }, { _id: 0 })),
    categoryItems: await watchesModal.aggregate([
      { $match: { category: category } },
      { $sample: { size: sideBarRandomPostsLength } },
      { $project: getItemProjection },
    ]),
  };
};
export const getPhone = async (category: string, slug: string) => {
  await smartModal.updateOne({slug}, {$inc:{hits:1}})
  return {
    phone: (
      await smartModal.findOne({ slug: slug, isActive: true }, { _id: 0})
    ),
    categoryItems: await smartModal.aggregate([
      { $match: { category: category, isActive: true } },
      { $sample: { size: sideBarRandomPostsLength } },
      { $project: getItemProjection },
    ]),
  };
};

export const getPhones = async (category: string, page: number) => {
  page = page === 1 ? 0 : page;
  const skip: number = (page > 1 ? page - 1 : page) * itemPerPage;
  const data = await smartModal
    .find({ category }, { _id: 0, image: 1, name: 1, slug: 1, popularity: 1  })
    .skip(skip)
    .limit(itemPerPage)
    .lean();
  return data;
};
export const getWatches = async (category: string, page: number) => {
  page = page === 1 ? 0 : page;
  const skip: number = (page > 1 ? page - 1 : page) * itemPerPage;
  return await watchesModal
    .find({ category }, { _id: 0, image: 1, name: 1, slug: 1 })
    .skip(skip)
    .limit(itemPerPage)
    .lean();
};
