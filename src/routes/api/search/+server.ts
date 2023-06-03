import { fullSearchResultLimitsText, searchResultLimit } from "$lib/constants";
import { searchInBlogs, searchInCategories, searchInFirmsCategories, searchInFirmwares, searchInLaptops, searchInPhones } from "$db/server";
export const GET = async ({ url }:any) => {
  if (url.searchParams.get("term")) {
    const cats = {
      phones: await searchInCategories(url.searchParams.get("term"), fullSearchResultLimitsText, 'phone'),
      laptops: await searchInCategories(url.searchParams.get("term"), fullSearchResultLimitsText, 'laptops'),
      firms: await searchInFirmsCategories(url.searchParams.get("term"), fullSearchResultLimitsText),
    }
    const __len__ = cats.phones.__len__ + cats.laptops.__len__ +  cats.firms.__len__ 
    return new Response(JSON.stringify({ 
      cats: {
        phones: cats.phones.cats,
        laptops: cats.laptops.cats,
        firms: cats.firms.cats,
      }, __len__
     }), {
      status: 200,
    });
  }
  if (url.searchParams.get("query")) {
    const { phones, phones_len } = await searchInPhones(url.searchParams.get("query"), searchResultLimit);
    const { blogs, blogs_len } = await searchInBlogs(url.searchParams.get("query"), searchResultLimit);
    const { laptops, laptops_len } = await searchInLaptops(url.searchParams.get("query"), searchResultLimit);
    const { firms, firms_len } = await searchInFirmwares(url.searchParams.get("query"), searchResultLimit);
    return new Response(JSON.stringify({ __res__: { phones, laptops, firms, blogs }, __len__: phones_len + laptops_len + firms_len + blogs_len, }), {
      status: 200,
    });
  }
  return new Response(JSON.stringify({ ok: "OK" }), { status: 200 });
};
