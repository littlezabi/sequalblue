import {
  blogsModel,
  firmwareCategories,
  Firmwares,
  laptopsModel,
  smartModel,
  watchesModel,
} from "$db/models";
import db from "$db/database";
await db.connect();

export const countPhones = async (category: string) => {
  return await smartModel.countDocuments({ category, isActive: true });
};
export const GET = async ({ url }) => {
  let count = 0;
  if (url.searchParams.get("blogs")) {
    count = await blogsModel.count({
      active:true
    });
  }
  if (url.searchParams.get("firmwares")) {
    const category = url.searchParams.get("category");
    count = await firmwareCategories.count({ category });
    count += await Firmwares.count({ category: category });
  }
  if (url.searchParams.get("watches")) {
    count = await watchesModel.count({
      category: url.searchParams.get("category"),
    });
  }
  if (url.searchParams.get("computers")) {
    count = await laptopsModel.count({
      category: url.searchParams.get("category"),
    });
  }
  if (url.searchParams.get("phones")) {
    count = await countPhones(url.searchParams.get("category"));
  }
  return new Response(JSON.stringify({ __count__: count }), { status: 200 });
};
