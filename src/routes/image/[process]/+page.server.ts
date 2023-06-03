import { getImageProcessedData } from "$db/server";
import type { PageServerLoad } from "./$types"
export const load:PageServerLoad = async ({ params, cookies }:any) => {
  const user = cookies.get('user') ? JSON.parse(cookies.get('user')) : false
  const analytics = await getImageProcessedData()
  let selecte_proc = params["process"];
  let validExtensions = ["jpg", "png"];
  let proc_type = selecte_proc.includes('compress') ? 'compressing' : selecte_proc.includes('invert') ? 'inverting' : 'converting'
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
  let validExtension: string = validExtensions.join(' ');
  let proc = selecte_proc.split("-")[0];
  validExtensions.forEach((ex) => {
    if (proc === ex) validExtension = `image/${ex}`;
  });
  return { buttons: [...selected, ...buttons], validExtension, proc_type,user,analytics,selecte_proc };
};
