import db from "$db/database";
import { categoriesModal } from "$db/models";
import { mainCatPerCollLimit } from "$lib/constants";
await db.connect();
const homeCatProjection = {
    _id: 0,
    image: 0,
    type: 0,
}
export const GET = async ({ url }) => {
    if (url.searchParams.get("get-home-categories")) {
        const computers = await categoriesModal.aggregate([
            { $match: {type: 'laptops', items: {$gt: 100}}},
            { $sample: { size: mainCatPerCollLimit } },
            { $project: homeCatProjection },
          ])
        const phones = await categoriesModal.aggregate([
            { $match: {type: 'phone', items: {$gt: 100}}},
            { $sample: { size: mainCatPerCollLimit + 1 } },
            { $project: homeCatProjection },
          ])
        const watches = await categoriesModal.aggregate([
            { $match: {type: 'watches', items: {$gt: 5}}},
            { $sample: { size: mainCatPerCollLimit } },
            { $project: homeCatProjection },
          ])
          return new Response(
            JSON.stringify({
                phones, computers, watches
            }),
            { status: 200 }
          );
    }
    return new Response(
        JSON.stringify({
          message: 'ok'
        }),
        { status: 200 }
      );
}