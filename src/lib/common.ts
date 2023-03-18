
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
    const r = Math.ceil(Math.random() * chars.length - 1);
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

export function formatBytes(bytes: any, decimals:number = 2, sep:string=" ") {
  if (!+bytes) return `0${sep}Bytes`;
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sep}${sizes[i]}`;
}

export const life = (__time__: string) => {
  /**
   * Format Datetime (Created by LittleZabi -> blueterminal Lab )
   * @param {time} time object
   * FORMATS:
   * month formats ~
   * MM -> full month name e.g March
   * Mm -> short month name e.g Mar
   * mm -> month number with zero if month < 10 e.g 03
   * m -> month number e.g 3
   * Date formats ~
   * Do -> Date with ordinal indicators like 1st, 2nd, 3rd, 20th
   * DD -> Date with zero if Date less then 10 e.g 08
   * D -> only Date number
   * Days formats ~
   * dddd -> Day of the week full like Monday
   * ddd -> Day of the week only 3 chars like Mon
   * dd -> Day of the week only 2 chars like Mo
   * Year formats ~
   * YYYY -> Full Year like 2023
   * YY -> only last two numbers like 23
   */
  let dt = new Date(__time__);
  if (!dt.getDate()) dt = new Date();
  const mF = (_i: number) =>
    "January_February_March_April_May_June_July_August_September_October_November_December".split(
      "_"
    )[_i];
  const mS = (_i: number) =>
    "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_")[_i];
  const dF = (_i: number) =>
    "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_")[_i];
  const dS = (_i: number) => "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_")[_i];
  const dSx = (_i: number) => "Su_Mo_Tu_We_Th_Fr_Sa".split("_")[_i];
  const xd = [dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getDay()];
  return {
    format: (f_: string) => {
      let __: string = f_;
      if (f_.includes("MM")) __ = __.replace("MM", mF(xd[1]));
      if (f_.includes("Mm")) __ = __.replace("Mm", mS(xd[1]));
      if (f_.includes("mm"))
        __ = __.replace(
          "mm",
          xd[1] + 1 < 10 ? "0" + (xd[1] + 1).toString() : (xd[1] + 1).toString()
        );
      if (f_.includes("m")) __ = __.replace("m", (xd[1] + 1).toString());
      if (f_.includes("Do"))
        __ = __.replace(
          "Do",
          xd[2] > 3
            ? xd[2].toString() + "th"
            : xd[2] === 1
            ? "1st"
            : xd[2] === 2
            ? "2nd"
            : "3rd"
        );
      if (f_.includes("DD"))
        __ = __.replace(
          "DD",
          xd[2] < 10 ? "0" + xd[1].toString() : xd[1].toString()
        );
      if (f_.includes("D")) __ = __.replace("D", xd[2].toString());
      if (f_.includes("dddd")) __ = __.replace("dddd", dF(xd[3]).toString());
      if (f_.includes("ddd")) __ = __.replace("ddd", dS(xd[3]).toString());
      if (f_.includes("dd")) __ = __.replace("dd", dSx(xd[3]).toString());
      if (f_.includes("YYYY")) __ = __.replace("YYYY", xd[0].toString());
      if (f_.includes("YY"))
        __ = __.replace("YY", xd[0].toString().substring(2, 4));
      return __;
    },
    from: () => {
      let dn = new Date().getTime();
      let e = dn - dt.getTime();
      if (e < 1000) return "Just now";
      const s = Math.floor(e / 1000);
      if (s < 60) return `${s} seconds ago`;
      const m = Math.floor((e / 1000) * 60);
      if (m < 60) return `${m} minutes ago`;
      const h = Math.floor(e / (1000 * 60 * 60));
      if (h < 24) return `${h} hours ago`;
      const d = Math.floor(e / (1000 * 60 * 60 * 24));
      if (d < 7) return d === 1 ? `24 hours ago` : `${d} days ago`;
      if (d <= 30) return `${Math.floor(d / 7)} week ago`;
      const mo = Math.floor(d / 30);
      if (mo >= 1 && mo < 12)
        return mo > 1 ? `${mo} months ago` : `1 month ago`;
      if (mo === 12) return "1 year ago";
      const moy = Math.floor(
        (e % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
      );
      const y = Math.floor(e / (1000 * 60 * 60 * 24 * 365));
      if (moy === 0) return `${y} yrs ago`;
      return `${y} ${y === 1 ? "years" : "years"} and ${moy} months ago`;
    },
  };
};
export const numberFormat = (__num__: number) => {
  return __num__ >= 1000000
    ? (__num__ / 1000000).toFixed(1) + "M"
    : __num__ >= 1000
    ? (__num__ / 1000).toFixed(1) + "K"
    : __num__.toString();
};

export const randomTitles = (limit:number)=>{
  const subtitle = [
      'level up!',
      `smart your ${new Date().getFullYear()}`,
      'upgrade your self',
      'be smart!',
      'untold story',
      'the apex of power',
      'master every view',
      'own your style',
      'stylized!',
      'power house!',
      'Pro every scene',
      'Pro anywhere',
      'Absolute Performance',
      'See the better picture',
      'Smart Performance',
      'Hot Power',
      'Silent Story',
      'Ever Beauty',
      'Edge Performance',
      'Hard Rules',
      'professional life'
  ]
  let __new = []
  for(let i = 0; i < limit; i++) __new.push(subtitle[Math.ceil((Math.random() * subtitle.length) - 1)])
  return __new
}


export const typingAnimations = (element:HTMLElement) => {
  let titles = randomTitles(5);
  titles.push(element?.innerText);
  let i = 1;
  let type = (text: string) => {
    let k = 0;
    let typing = setInterval(() => {
      if (k) element.innerHTML += text[k];
      else element.innerHTML = text[k];
      k++;
      if (k > text.length - 1) clearInterval(typing);
    }, 100);
  };
  type(titles[0]);
  setInterval(() => {
    type(titles[i]);
    i++;
    if (i > titles.length - 1) i = 0;
  }, 4000);
}