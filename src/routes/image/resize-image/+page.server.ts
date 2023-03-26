import { getImageProcessedData } from "$db/server";
import type { PageServerLoad } from "./$types"
export const load: PageServerLoad = async ({ params, cookies }:any) => {
  const user = cookies.get('user') ? JSON.parse(cookies.get('user')) : false
  const analytics = await getImageProcessedData()
  return {analytics, user};
};
