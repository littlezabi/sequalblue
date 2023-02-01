import db from "$db/database";
import {
  categoriesModal,
  firmwareCategories,
  Firmwares,
  laptopsModal,
  smartModal,
  watchesModal,
  Announcments
} from "$db/models";
import { firmsCatFields, firmsFields } from "$db/server";
import { firmsRelatedCategoryLimit, mainCatPerCollLimit } from "$lib/constants";
await db.connect();

const homeCatProjection = {
  _id: 0,
  image: 0,
  type: 0,
};
export const GET = async ({ url }:any) => {
  if(url.searchParams.get('getAnnouncment')){
    const announcments = await Announcments.find().limit(1)
    return new Response(JSON.stringify({
      announcments:announcments[0] 
    }), {status: 200}) 
  }
  if (url.searchParams.get("randomFirms")) {
    const firms = await Firmwares.aggregate([
      { $sample: { size: firmsRelatedCategoryLimit } },
      { $project: firmsFields },
    ]);
    const folders = await firmwareCategories.aggregate([
      { $sample: { size: firmsRelatedCategoryLimit } },
      { $project: firmsCatFields },
    ]);
    return new Response(JSON.stringify({firms,folders}), {status:200})
  }
  if (url.searchParams.get("side-items")) {
    const limit = url.searchParams.get('limit')
    const phone = await smartModal
      .find({}, { _id: 0, image: 1, name: 1, slug: 1, category:1 })
      .sort("-1")
      .limit(limit);
    const computers = await laptopsModal
            .find({}, { _id: 0, image: 1, name: 1, slug: 1, cpu: 1, ram: 1, category:1 })
            .sort("-1")
            .limit(limit)
       
    const watches = await watchesModal
            .find({}, { _id: 0, image: 1, name: 1, slug: 1, category:1 })
            .sort("-1")
            .limit(limit)
    return new Response(JSON.stringify({ phone, computers, watches }), {
      status: 200,
    });
  }
  if (url.searchParams.get("get-home-categories")) {
    const computers = await categoriesModal.aggregate([
      { $match: { type: "laptops", items: { $gt: 100 } } },
      { $sample: { size: mainCatPerCollLimit } },
      { $project: homeCatProjection },
    ]);
    const phones = await categoriesModal.aggregate([
      { $match: { type: "phone", items: { $gt: 100 } } },
      { $sample: { size: mainCatPerCollLimit + 1 } },
      { $project: homeCatProjection },
    ]);
    const watches = await categoriesModal.aggregate([
      { $match: { type: "watches", items: { $gt: 5 } } },
      { $sample: { size: mainCatPerCollLimit } },
      { $project: homeCatProjection },
    ]);
    return new Response(
      JSON.stringify({
        phones,
        computers,
        watches,
      }),
      { status: 200 }
    );
  }
  return new Response(
    JSON.stringify({
      message: "ok",
    }),
    { status: 200 }
  );
};
