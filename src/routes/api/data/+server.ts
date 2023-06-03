import db from "$db/database";
import {
  categoriesModel,
  firmwareCategories,
  Firmwares,
  laptopsModel,
  smartModel,
  Announcments,
  blogsModel,
} from "$db/models";
import { firmsCatFields, firmsFields } from "$db/server";
import {
  firmsRelatedCategoryLimit,
  latestBlogsLimit,
  mainCatPerCollLimit,
} from "$lib/constants";
await db.connect();
export const GET = async ({ url }: any) => {
  if (url.searchParams.get("getItems")) {
    const phone = await smartModel.findOne(
      { slug: url.searchParams.get("slug") },
      { _id: 0, keywords: 0, original: 0, integrity: 0 }
    );
    return new Response(JSON.stringify(phone), { status: 200 });
  }
  if (url.searchParams.get("latestBlogs")) {
    const blogs = await blogsModel
      .find(
        {},
        {
          title: 1,
          subtitle: 1,
          author: 1,
          createdAt: 1,
          isNew: 1,
          slug: 1,
          image: 1,
          _id: 0,
        }
      )
      .sort("-1")
      .limit(latestBlogsLimit)
      .lean();
    return new Response(JSON.stringify({ blogs }), { status: 200 });
  }
  if (url.searchParams.get("getAnnouncment")) {
    const announcments = await Announcments.find().limit(1);
    return new Response(
      JSON.stringify({
        announcments: announcments[0],
      }),
      { status: 200 }
    );
  }
  if (url.searchParams.get("randomFirms")) {
    const firms = await Firmwares.aggregate([
      { $sample: { size: firmsRelatedCategoryLimit } },
      { $project: { ...firmsFields } },
    ]);
    const folders = await firmwareCategories.aggregate([
      { $sample: { size: firmsRelatedCategoryLimit } },
      { $project: { ...firmsCatFields, desc: 0 } },
    ]);
    return new Response(JSON.stringify({ firms, folders }), { status: 200 });
  }
  if (url.searchParams.get("side-items")) {
    const limit = url.searchParams.get("limit") ?? 5;
    const phone = await smartModel
      .find(
        {},
        { _id: 0, image: 1, title: 1, loves: 1, views: 1, slug: 1, category: 1 }
      )
      .sort("-1")
      .limit(limit);
    const computers = await laptopsModel
      .find(
        {},
        {
          _id: 0,
          image: 1,
          title: 1,
          views: 1,
          loves: 1,
          slug: 1,
          cpu: 1,
          ram: 1,
          category: 1,
        }
      )
      .sort("-1")
      .limit(limit);
    return new Response(JSON.stringify({ phone, computers }), {
      status: 200,
    });
  }
  if (url.searchParams.get("get-home-categories")) {
    const categories = await categoriesModel.find({}, { _id: 0, type: 0}).sort('-items').limit(mainCatPerCollLimit)
    return new Response(
      JSON.stringify(categories),
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
