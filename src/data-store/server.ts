import {
  firmsAndFolderPerPage,
  fullSearchResultLimits,
  itemPerPage,
  mainNewArrivalsLimit,
  sideBarRandomPostsLength,
} from "$lib/constants";
import db from "$db/database";
import {
  categoriesModal,
  firmwareCategories,
  Firmwares,
  laptopsModal,
  smartModal,
  watchesModal,
} from "./models";
await db.connect();

export const firmsFields = {
  _id: 0,
  active: 0,
  updatedAt: 0,
  parent_title: 0,
  downloads: 0,
  folder_id: 0,
  folder_title: 0,
  is_active: 0,
  tags: 0,
  url: 0,
  url_type: 0,
  visits: 0,
};
export const firmsCatFields = {
  _id: 0,
  active: 0,
  category: 0,
  parent_id: 0,
  parent_title: 0,
  createdAt: 0,
};
const projection1 = { _id: 0, name: 1, category: 1, slug: 1 };
export const searchInFirmsCategories = async (regex: any, limit: number) => {
  const cats = await firmwareCategories
    .find({ $or: [{ title: { $regex: regex, $options: 'mi' } }] }, {_id: 0, title: 1, slug: 1})
    .limit(limit)
    .lean();
  return { cats, __len__: cats.length };
};
export const searchInCategories = async (regex: any, limit: number, type:string) => {
  const cats = await categoriesModal
    .find({ type, $or: [{ category: { $regex: regex, $options: 'mi' } }] }, {category: 1, _id: 0, type: 1})
    .limit(limit)
    .lean();
  return { cats, __len__: cats.length };
};
export const searchInPhones = async (regex: any, limit: number, projection = {}) => {
  const phones = await smartModal
    .find({ $or: [{ name: { $regex: regex, $options: 'mi' } }] }, { ...projection1, ...projection })
    .limit(limit)
    .lean();
  return { phones, phones_len: phones.length };
};
export const searchInWatches = async (regex: any, limit:number, projection={}) => {
  const watches = await watchesModal
    .find({ $or: [{ name: { $regex: regex, $options: 'mi' } }] }, {...projection1, ...projection})
    .limit(limit).lean();
  return { watches, watches_len: watches.length };
};
export const searchInLaptops = async (regex: any, limit:number, projection={}) => {
  const laptops = await laptopsModal
    .find({ $or: [{ name: { $regex: regex, $options: 'mi' } }] }, {...projection1, ...projection})
    .limit(limit).lean();
  return { laptops, laptops_len: laptops.length };
};
export const searchInFirmwares = async (regex: any, limit:number, projection={}) => {
  const firms = await Firmwares.find(
    { $or: [{ title: { $regex: regex, $options: 'mi' } }] },
    { _id: 0, title: 1, category: 1, slug: 1, ...projection }
  ).limit(limit).lean();
  return { firms, firms_len: firms.length };
};
export const searchTermIn = async (term: string, search_in = "all") => {
  if (search_in === "all") {
    const { phones, phones_len } = await searchInPhones(term, fullSearchResultLimits, {image: 1});
    const { watches, watches_len } = await searchInWatches(term, fullSearchResultLimits,  {image: 1});
    const { laptops, laptops_len } = await searchInLaptops(term, fullSearchResultLimits,  {image: 1, cpu: 1, ram: 1});
    const { firms, firms_len } = await searchInFirmwares(term, fullSearchResultLimits,{price: 1,is_featured:1,is_new:1,rating_points:1,rating_count:1});
    return {
      results: { phones, watches, laptops, firms },
      __len__: phones_len + watches_len + laptops_len + firms_len,
    };
  }
};
export const getFirmware = async (slug: string, cat: string) => {
  return {
    firmware: JSON.stringify(
      await Firmwares.findOne(
        { slug, is_active: 1 },
        { url_type: 0, is_active: 0 }
      ).limit(1)
    ),
  };
};
export async function getFirmCat() {
  return await firmwareCategories
    .find(
      { parent_id: 0, active: true },
      {
        _id: 0,
        active: 0,
        createdAt: 0,
        folder_id: 0,
        updatedAt: 0,
        parent_title: 0,
        description: 0,
        parent_id: 0,
        is_new: 0,
        category: 0,
      }
    )
    .lean();
}
export async function getFirmAndFolders(pslug: string, page: number) {
  page = page === 1 ? 0 : page;
  const skip: number = (page > 1 ? page - 1 : page) * firmsAndFolderPerPage;
  const folders = await firmwareCategories
    .find({ category: pslug }, firmsCatFields)
    .skip(skip)
    .limit(firmsAndFolderPerPage)
    .lean();
  const firms = await Firmwares.find({ category: pslug }, firmsFields)
    .skip(skip)
    .limit(firmsAndFolderPerPage)
    .lean();
  return { folders, firms };
}
export const homeViewObjects = async (obj_: any) => {
  const items = {
    phones: obj_.phones
      ? await smartModal
          .find({}, { _id: 0, image: 1, name: 1, slug: 1 })
          .limit(mainNewArrivalsLimit)
          .lean()
      : false,
    computers: obj_.computers
      ? await laptopsModal
          .find({}, { _id: 0, image: 1, name: 1, slug: 1, ram: 1, cpu: 1 })
          .limit(mainNewArrivalsLimit)
          .lean()
      : false,
  };
  return items;
};
export const getComputer = async (slug: string, category: string) => {
  return {
    computers: (
      await laptopsModal.find(
        { slug: slug },
        {
          _id: 0,
          amazon_store: 0,
          amazon_price: 0,
          createdAt: 0,
          category: 0,
        }
      )
    )[0],
    categoryItems: await laptopsModal.aggregate([
      { $match: { category: category } },
      { $sample: { size: sideBarRandomPostsLength } },
      {
        $project: {
          _id: 0,
          image: 1,
          isNew: 1,
          name: 1,
          slug: 1,
          ram: 1,
          cpu: 1,
        },
      },
    ]),
  };
};
export const computerCatItems = async (category: string, page: number) => {
  page = page === 1 ? 0 : page;
  const skip: number = (page > 1 ? page - 1 : page) * itemPerPage;
  const items = await laptopsModal
    .find(
      { category: category },
      { name: 1, ram: 1, cpu: 1, slug: 1, image: 1, _id: 0 }
    )
    .skip(skip)
    .limit(itemPerPage)
    .lean();
  return items;
};
export const getCategories = async (type: string) => {
  return await categoriesModal
    .find({ type }, { _id: 0, type: 0, image: 0 })
    .lean();
};
