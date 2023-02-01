import { fullSearchResultLimitsText, searchResultLimit } from "$lib/constants";
import { searchInCategories, searchInFirmsCategories, searchInFirmwares, searchInLaptops, searchInPhones, searchInWatches } from "$db/server";
export const GET = async ({ url }) => {
  if (url.searchParams.get("term")) {
    const cats = {
      phones: await searchInCategories(url.searchParams.get("term"), fullSearchResultLimitsText, 'phone'),
      laptops: await searchInCategories(url.searchParams.get("term"), fullSearchResultLimitsText, 'laptops'),
      watches: await searchInCategories(url.searchParams.get("term"), fullSearchResultLimitsText, 'watches'),
      firms: await searchInFirmsCategories(url.searchParams.get("term"), fullSearchResultLimitsText),
    }
    const __len__ = cats.phones.__len__ + cats.laptops.__len__ + cats.watches.__len__ +  cats.firms.__len__ 
    return new Response(JSON.stringify({ 
      cats: {
        phones: cats.phones.cats,
        laptops: cats.laptops.cats,
        watches: cats.watches.cats,
        firms: cats.firms.cats,
      }, __len__
     }), {
      status: 200,
    });
  }
  if (url.searchParams.get("query")) {
    const { phones, phones_len } = await searchInPhones(url.searchParams.get("query"), searchResultLimit);
    const { watches, watches_len } = await searchInWatches(url.searchParams.get("query"), searchResultLimit);
    const { laptops, laptops_len } = await searchInLaptops(url.searchParams.get("query"), searchResultLimit);
    const { firms, firms_len } = await searchInFirmwares(url.searchParams.get("query"), searchResultLimit);
    return new Response(JSON.stringify({ __res__: { phones, watches, laptops, firms }, __len__: phones_len + watches_len + laptops_len + firms_len, }), {
      status: 200,
    });
  }
  return new Response(JSON.stringify({ ok: "OK" }), { status: 200 });
};
