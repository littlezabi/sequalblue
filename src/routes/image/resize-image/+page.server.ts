import { getImageProcessedData } from "$db/server";
import type { PageServerLoad } from "./$types"
export const load: PageServerLoad = async ({ params, cookies }:any) => {
  const user = cookies.get('user') ? JSON.parse(cookies.get('user')) : false
  let selecte_proc = params["process"];
  const analytics = await getImageProcessedData()
  const buttons = [
    { name: "PNG to JPG", ops: "png-to-jpg" },
    { name: "JPG to PNG", ops: "jpg-to-png" },
    { name: "Compress PNG Image", ops: "png-image-compress" },
    { name: "Compress JPG Image", ops: "jpg-image-compress" },
    { name: "Invert Image", ops: "invert-image" },
    { name: "Fast Resize Image", ops: "resize-image" },
  ];
  let selected = buttons.filter((btn) => {
    if (btn.ops === selecte_proc) return btn;
  });
  return {buttons: [...selected, ...buttons], analytics, user};
};
