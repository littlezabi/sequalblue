import { itemPerPage, sideBarRandomPostsLength } from "$lib/constants";
import { categoriesModal, laptopsModal } from "./models";

export const getComputer = async (slug:string, category:string)=>{
    // const item: object = await laptopsModal.find({ slug: slug }, { _id: 0 });
    return {
      computers: (
          await laptopsModal
            .find({ slug: slug }, { _id: 0  })
        )[0],
        categoryItems: await laptopsModal
          .aggregate([
            { $match: { category: category } },
            { $sample: { size: sideBarRandomPostsLength } },
            { $project: { _id: 0, image: 1, isNew: 1, name: 1, slug: 1 } },
          ])
      };
}

export const computerCatItems =async (category:string, page:number) => {
    page = page === 1 ? 0 : page;
  const skip: number = (page > 1 ? page - 1 : page) * itemPerPage;
  const items = await laptopsModal
    .find({ category: category }, { name: 1, ram: 1, cpu:1, slug: 1, image: 1, _id: 0 })
    .skip(skip)
    .limit(itemPerPage);
    return items
}

export const getPcCategories = async ()=>{
    const categories: any = await categoriesModal.find(
        { type: 'laptops' },
        { _id: 0, type: 0, image: 0 }
      );
      return categories
}