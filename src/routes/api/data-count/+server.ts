import {
  firmwareCategories,
  Firmwares,
  laptopsModal,
  watchesModal,
} from "$db/models";
import { countPhones } from "$db/phones";

export const GET = async ({ url }) => {
  let count = 0;
  if (url.searchParams.get("firmwares")) {
    const category = url.searchParams.get("category");
    count = await firmwareCategories.count({ category });
    count += await Firmwares.count({ category: category });
  }
  if (url.searchParams.get("watches")) {
    count = await watchesModal.count({
      category: url.searchParams.get("category"),
    });
  }
  if (url.searchParams.get("computers")) {
    count = await laptopsModal.count({
      category: url.searchParams.get("category"),
    });
  }
  if (url.searchParams.get("phones")) {
    count = await countPhones(url.searchParams.get("category"));
  }
  return new Response(JSON.stringify({ __count__: count }), { status: 200 });
};
