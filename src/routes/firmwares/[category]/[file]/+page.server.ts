import { getFirmware } from "$db/server";
import type { PageServerLoad } from "./$types";
export const load = (async ({ params }: any) => {
  const slug = params.file;
  const cat = params.category
  const {firmware} = await getFirmware(slug);
  console.log('fimware: ', firmware)
  return { firmware: JSON.parse(firmware),  slug, cat  };
}) satisfies PageServerLoad;
