import { firmsAndFolderPerPage, itemPerPage, mainNewArrivalsLimit, sideBarRandomPostsLength } from "$lib/constants";
import db from "$db/database";
import { categoriesModal, firmwareCategories, Firmwares, laptopsModal, smartModal } from "./models";
await db.connect();

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
export async function getFirmAndFolders(pslug:string, page:number) {
  page = page === 1 ? 0 : page;
  const skip: number = (page > 1 ? page - 1 : page) * firmsAndFolderPerPage;
  const folders = await firmwareCategories
    .find(
      { category: pslug },
      {
        _id: 0,
        active: 0, 
        category: 0,
        parent_id: 0,
        folder_id: 0,
        parent_title: 0,
        createdAt: 0,
      }
    )
    .skip(skip)
    .limit(firmsAndFolderPerPage).lean();
    console.log('folders: ', folders, skip)
  const firms = await Firmwares
    .find(
      { category:pslug, is_active: 1 },
      {
        _id: 0,
        active: 0,
        createdAt: 0,
        updatedAt: 0,
        parent_title: 0,
        description: 0,
        downloads: 0, 
        folder_id: 0,
        folder_title: 0,
        is_active: 0,
        rating_count: 0,
        size: 0,
        tags: 0,
        url: 0,
        url_type: 0,
        visits: 0
      }
    )
    .skip(skip)
    .limit(firmsAndFolderPerPage).lean();
  return {folders, firms};
}


export const homeViewObjects = async (obj_:any)=>{
  const items = {
    phones: obj_.phones ? await  smartModal.find({}, { _id: 0, image: 1, name: 1, slug: 1 }).limit(mainNewArrivalsLimit) : false,
    computers: obj_.computers ? await  laptopsModal.find({}, { _id: 0, image: 1, name: 1, slug: 1, ram: 1, cpu: 1 }).limit(mainNewArrivalsLimit) : false,
  }
  return items
} 

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
      { $project: { _id: 0, image: 1, isNew: 1, name: 1, slug: 1, ram:1, cpu:1 } },
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
    .limit(itemPerPage).lean();
  return items;
};

export const getCategories = async (type:string) => {
  return  await categoriesModal.find(
    { type },
    { _id: 0, type: 0, image: 0 }
  ).lean();
};
