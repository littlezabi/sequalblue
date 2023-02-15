import {
  blogsPagePostLimit,
  firmsAndFolderPerPage,
  fullSearchResultLimits,
  itemPerPage,
  mainNewArrivalsLimit,
  sideBarRandomPostsLength,
  worldActivitiesPostLimit,
} from "$lib/constants";
import db from "$db/database";
import {
  categoriesModel,
  firmwareCategories,
  Firmwares,
  laptopsModel,
  smartModel,
  watchesModel,
  blogsModel
} from "./models";
await db.connect();
const blogsProjection = {body:0, _id: 0, tags: 0, keywords: 0, fans: 0,category: 0, hits: 0,updatedAt:0}
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
export const getBlog = async (slug:string) => {
  await blogsModel.updateOne({slug},{$inc: {hits: 1}})
  const blog = await blogsModel.findOne({slug}, {_id: 0}).lean()
  const related = await blogsModel.find({tags: {$in: blog.tags}, slug: {$ne: slug}}, {...blogsProjection}).lean()
  return  {
    blog, related
  }
}
export const getBlogs = async (page:number)=>{
  page = page === 1 ? 0 : page;
  const skip: number = (page > 1 ? page - 1 : page) * blogsPagePostLimit;
  const blogs = await blogsModel.find({}, blogsProjection).skip(skip).limit(blogsPagePostLimit).lean()
  return blogs
}
export const getTrends = async (search:string) => {
  let filter:any = {hits: -1}
  if(search === 'trends') filter = {hits: -1}
  if(search === 'loved') filter = {fans: -1}
  if(search === 'popular') filter = {popularity: -1}
  const phones = await smartModel.find({},{_id:0,hits:1,fans:1,popularity:1,  name: 1, image: 1,slug:1,category:1}).limit(worldActivitiesPostLimit).sort(filter).lean()
  const watches = await watchesModel.find({},{_id:0,hits:1,popularity:1, fans:1, name: 1, image: 1,slug:1,category:1}).limit(worldActivitiesPostLimit).sort(filter).lean()
  const laptops = await laptopsModel.find({},{_id:0,hits:1,popularity:1, fans:1, name: 1, image: 1,slug:1,category:1}).limit(worldActivitiesPostLimit).sort(filter).lean()
  const firmwares = await Firmwares.find({},{_id:0,hits:1,popularity:1, fans:1, title: 1, slug:1,category:1}).limit(worldActivitiesPostLimit).sort(filter).lean()
  return {phones,watches,laptops,firmwares}
}
export const visitorCount = (slug:string, ip:string)=>{
  console.log(slug, ip)
}
export const searchInFirmsCategories = async (regex: any, limit: number) => {
  const cats = await firmwareCategories
    .find({ $or: [{ title: { $regex: regex, $options: 'mi' } }] }, {_id: 0, title: 1, slug: 1})
    .limit(limit)
    .lean();
  return { cats, __len__: cats.length };
};
export const searchInCategories = async (regex: any, limit: number, type:string) => {
  const cats = await categoriesModel
    .find({ type, $or: [{ category: { $regex: regex, $options: 'mi' } }] }, {category: 1, _id: 0, type: 1})
    .limit(limit)
    .lean();
  return { cats, __len__: cats.length };
};
export const searchInPhones = async (regex: any, limit: number, projection = {}) => {
  const phones = await smartModel
    .find({ $or: [{ name: { $regex: regex, $options: 'mi' } }, {slug: { $regex: regex, $options: 'i' }}]  }, { ...projection1, ...projection })
    .limit(limit)
    .lean();
  return { phones, phones_len: phones.length };
};
export const searchInWatches = async (regex: any, limit:number, projection={}) => {
  const watches = await watchesModel
    .find({ $or: [{ name: { $regex: regex, $options: 'mi' } }, {slug: { $regex: regex, $options: 'i' }}] }, {...projection1, ...projection})
    .limit(limit).lean();
  return { watches, watches_len: watches.length };
};
export const searchInLaptops = async (regex: any, limit:number, projection={}) => {
  const laptops = await laptopsModel
    .find({ $or: [{ name: { $regex: regex, $options: 'mi' } }, {slug: { $regex: regex, $options: 'i' }}]  }, {...projection1, ...projection})
    .limit(limit).lean();
  return { laptops, laptops_len: laptops.length };
};
export const searchInFirmwares = async (regex: any, limit:number, projection={}) => {
  const firms = await Firmwares.find(
    { $or: [{ title: { $regex: regex, $options: 'mi' } }, {slug: { $regex: regex, $options: 'mi' }}]  },
    { _id: 0, title: 1, category: 1, slug: 1, ...projection }
  ).limit(limit).lean();
  return { firms, firms_len: firms.length };
};
export const searchTermIn = async (term: string, search_in = "all") => {
  if (search_in === "all") {
    const { phones, phones_len } = await searchInPhones(term, fullSearchResultLimits, {image: 1});
    const { watches, watches_len } = await searchInWatches(term, fullSearchResultLimits,  {image: 1});
    const { laptops, laptops_len } = await searchInLaptops(term, fullSearchResultLimits,  {image: 1, cpu: 1, ram: 1});
    const { firms, firms_len } = await searchInFirmwares(term, fullSearchResultLimits,{price: 1,is_featured:1,is_new:1,popularity:1,hits:1});
    return {
      results: { phones, watches, laptops, firms },
      __len__: phones_len + watches_len + laptops_len + firms_len,
    };
  }
};
export const getFirmware = async (slug: string) => {
  await Firmwares.updateOne({slug}, {$inc:{hits:1}})
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
      ? await smartModel
          .find({}, { _id: 0, image: 1,category: 1, name: 1, slug: 1 })
          .limit(mainNewArrivalsLimit)
          .lean()
      : false,
    computers: obj_.computers
      ? await laptopsModel
          .find({}, { _id: 0, image: 1, name: 1,category:1, slug: 1, ram: 1, cpu: 1 })
          .limit(mainNewArrivalsLimit)
          .lean()
      : false,
  };
  return items;
};
export const getComputer = async (slug: string, category: string) => {
  await laptopsModel.updateOne({slug}, {$inc:{hits:1}})
  return {
    computers: (
      await laptopsModel.find(
        { slug: slug },
        {
          _id: 0,
          amazon_store: 0,
          amazon_price: 0,
          createdAt: 0,
          category: 0,
          original: 0,
        }
      )
    )[0],
    categoryItems: await laptopsModel.aggregate([
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
  const items = await laptopsModel
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
  return await categoriesModel
    .find({ type }, { _id: 0, type: 0, image: 0 })
    .lean();
};
