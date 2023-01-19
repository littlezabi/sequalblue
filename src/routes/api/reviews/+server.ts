import db from "$db/database";
import { reviewsModal } from "$db/models";
import { commentsLimit, perPostCommentAllow } from "$lib/constants";
await db.connect();
export const POST = async ({ request, url }) => {
  const data = await request.formData();
  if (url.searchParams.get("set-review")) {
    const review = data.get("review");
    const post_id = data.get("post_id");
    const _id = data.get("_id");
    const username = data.get("username");
    const country = data.get("country");
    const check_ = await reviewsModal.find({ user_id: _id, post_id });
    if (check_.length > perPostCommentAllow) {
      return new Response(
        JSON.stringify({
          message: `You can set only ${perPostCommentAllow} reviews or comments on a post!`,
        }),
        { status: 422 }
      );
    } else {
      const reviews = await reviewsModal.create({
        review,
        post_id,
        user_id: _id,
        username,
        country,
      });
      return new Response(
        JSON.stringify({
            reviews,
        }),
        { status: 200 }
      );
    }
  }
};

export const GET = async ({ request, url }) => {
  if (url.searchParams.get("post_slug")) {
    const reviewsCount = await reviewsModal.countDocuments({ post_id: url.searchParams.get("post_slug")})
    const reviews = await reviewsModal
    .find(
      {
        post_id: url.searchParams.get("post_slug"),
      },
      {
        post_id: 0,
        updatedAt: 0,
        user_id: 0,
        __v: 0,
        ip: 0,
        _id: 0,
      }
    )
    .sort({ _id: -1 })
    .skip(commentsLimit * 0)
    .limit(commentsLimit);
    return new Response(JSON.stringify({ reviews,reviewsCount }), { status: 200 });
  }
  return new Response(JSON.stringify({ request: "empty" }), { status: 403 });
};
