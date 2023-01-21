import db from "$db/database";
import {
  itemPerPage,
  mainNewArrivalsLimit,
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
  return {
    watch: (await watchesModal.find({ slug: slug }, { _id: 0 }))[0],
    categoryItems: await watchesModal.aggregate([
      { $match: { category: category } },
      { $sample: { size: sideBarRandomPostsLength } },
      { $project: getItemProjection },
    ]),
  };
};
export const getPhone = async (category: string, slug: string) => {
  return {
    phone: (
      await smartModal.find({ slug: slug, isActive: true }, { _id: 0 })
    )[0],
    categoryItems: await smartModal.aggregate([
      { $match: { category: category, isActive: true } },
      { $sample: { size: sideBarRandomPostsLength } },
      { $project: getItemProjection },
    ]),
  };
};

export const countPhones = async (category: string) => {
  return await smartModal.countDocuments({ category, isActive: true });
};

export const getPhones = async (category: string, page: number) => {
  page = page === 1 ? 0 : page;
  const skip: number = (page > 1 ? page - 1 : page) * itemPerPage;
  const data = await smartModal
    .find({ category }, { _id: 0, image: 1, name: 1, slug: 1 })
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
