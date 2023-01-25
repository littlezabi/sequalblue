import { getFirmware } from "$db/server";
import type { PageServerLoad } from "./$types";
export const load = (async ({ params }: any) => {
  const slug = params.file;
  const cat = params.category
  const {firmware} = await getFirmware(slug, cat);
  // const {firms,folders} = await getFirmAndFolders(cat, 1);
  return { firmware: JSON.parse(firmware),  slug, cat  };
}) satisfies PageServerLoad;
