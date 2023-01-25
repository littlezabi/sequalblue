export function DisplaySizes(size: any) {
  let d = size.split("x")[0];
  d = parseInt(d);
  if (d < 480) return d + "p SD Display";
  else if (d > 480 && d < 721) return d + "p HD Display";
  else if (d > 720 && d < 1081) return d + "p FHD Display";
  else if (d > 1080 && d < 1441) return d + "p Quad HD Display";
  else if (d > 1440 && d < 2049) return d + "p 2k Display";
  else if (d > 2048 && d < 2161) return d + "p 4k Display";
  else if (d > 2160 && d < 4321) return d + "p 8k Display";
  else return size + "hello";
}

export const setUserCharName = (name: string) => {
  const k = name.split(" ");
  let n = "";
  k.map((e, i) => (i < 2 ? (n += e[0]) : ""));
  if (n === "") n = name[0];
  return n.toUpperCase();
};

export const randomChar = (length: number) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let new_ = "";
  let c = 0;
  for (let i = 0; i < length; i++) {
    if (c === 5) {
      new_ += "-";
      c = 0;
    }
    c++;
    let r = Math.ceil(Math.random() * chars.length - 1);
    new_ += chars[r];
  }
  return new_;
};
export const setForm = (obj_: any) => {
  const form = new FormData();
  for (const item in obj_) {
    form.append(item, obj_[item]);
  }
  return form;
};

export function ValidateEmail(mail: string) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

export function formatBytes(bytes:number | string, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}