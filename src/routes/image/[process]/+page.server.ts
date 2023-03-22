import type { PageServerLoad } from "./types";
export const load: PageServerLoad = ({ params }) => {
  let selecte_proc = params["process"];
  let validExtensions = ["jpg", "png"];
  let proc_type = selecte_proc.includes('compress') ? 'compressing' : selecte_proc.includes('invert') ? 'inverting' : 'converting'
  const buttons = [
    { name: "PNG to JPG", ops: "png-to-jpg" },
    { name: "JPG to PNG", ops: "jpg-to-png" },
    { name: "PNG to ICO", ops: "png-to-ico" },
    { name: "Compress PNG Image", ops: "png-image-compress" },
    { name: "Compress JPG Image", ops: "jpg-image-compress" },
    { name: "Invert Image", ops: "invert-image" },
  ];
  let selected = buttons.filter((btn) => {
    if (btn.ops === selecte_proc) return btn;
  });
  let validExtension: string = validExtensions.join(' ');
  let proc = selecte_proc.split("-")[0];
  validExtensions.forEach((ex) => {
    if (proc === ex) validExtension = `image/${ex}`;
  });
  return { buttons: [...selected, ...buttons], validExtension, proc_type };
};
