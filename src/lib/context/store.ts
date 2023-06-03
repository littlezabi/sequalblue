import { writable } from "svelte/store";

export const ANNOUNCMENTS: any = writable([]);
export const ANNOUNCMENTS_ADD = (data: any) =>
  ANNOUNCMENTS.update(() => {
    return data;
  });
export const ROTATERY_DATA: any = writable({ firmwares: false, phones: [] });
export const ROTATERY_DATA_ADD = (res: any, type: string) =>
  ROTATERY_DATA.update((ROTATERY_DATA: any) => {
    if (type === "firms") return { ...ROTATERY_DATA, firmwares: res };
    if (type === "phones") return { ...ROTATERY_DATA, phones: res };
    return res;
  });

export const __SEARCHS__: any = writable([]);
export const ADD_SEARCH_RESULT = (res: any) =>
  __SEARCHS__.update(() => {
    return res;
  });

const __MESSAGE__: any = [];
export const MESSAGE = writable(__MESSAGE__);
export const ADD_MESSAGE = (message: { message: string; variant: string }) => {
  MESSAGE.update((MESSAGE) => {
    let messages = MESSAGE.length > 2 ? MESSAGE.slice(-2) : MESSAGE
    messages = [
      ...messages,
      { id: messages[0] ? messages[messages.length - 1].id + 1 : 1, ...message },
    ]
    return messages;
  });
};
export const REMOVE_MESSAGE = (id: number) => {
  MESSAGE.update((MESSAGE) => {
    return MESSAGE.filter((e:any) => e.id != id);
  });
};
const CART = { firmware: [] };
export const CART_CONTEXT = writable(CART);
export const CART_ADD = (__item__: any, type: string = "") => {
  CART_CONTEXT.update((CART_CONTEXT) => {
    return CART_CONTEXT;
  });
};

const USER:any = false;
export const USER_CONTEXT:any = writable(USER);
export const USER_UPDATE = (user: any) =>
  USER_CONTEXT.update(() => {
    return user;
  });
export const LOGOUT = () => {
  USER_CONTEXT.set(false);
};
// modal
export const MODAL = {
  show: false,
  children: "",
  isClosing: false,
  title: "",
  extras: undefined,
  body: false,
  buttons: [
    { title: "", response: 0, closeModal: false },
    { title: "", response: 0, closeModal: false },
  ],
};
export const MODAL_CONTEXT = writable(MODAL);
export const SET_MODAL = (modal: any) => {
  MODAL_CONTEXT.update((MODAL_CONTEXT) => {
    return { ...MODAL_CONTEXT, ...modal };
  });
};
export const CLOSE_MODAL = () => {
  MODAL_CONTEXT.update((MODAL_CONTEXT) => {
    return { ...MODAL_CONTEXT, isClosing: true };
  });
};
// end modal
// custom states
export const CUSTOM_STATE: any = writable({});
export const CUSTOM_STATE_ADD = (state: any) =>
  CUSTOM_STATE.update((CUSTOM_STATE: any) => {
    return { ...CUSTOM_STATE, ...state };
  });
// end custom states

// interface ViewItemInit {
//   slugList: unknown[];
//   itemsList: unknown[];
// }

// let viewItemInit: ViewItemInit = {
//   slugList: ['alcatel-1l-2021-', 'alcatel-1s-2021-', 'alcatel-3l-2021-', 'alcatel-1se-2020-'],
//   itemsList: [{"hits":1,"fans":1,"popularity":1,"title":"alcatel 1L (2021)","display":[{"type":"IPS"},{"screen":"IPS LCD"},{"display height":6.1},{"display width":91.3},{"screen-to-body":78.6},{"screen width":720},{"screen height":1560},{"screen ratio":".5:9"},{"ppi":282}],"comms":[{"wlan":"Wi-Fi 802.11 b/g/n, Wi-Fi Direct"},{"bluetooth":"5.0, A2DP, LE"},{"positioning":"GPS, GLONASS, GALILEO, BDS"},{"nfc":"No"},{"radio":"FM radio"},{"usb":"microUSB 2.0, OTG"}],"network":[{"technology":"GSM, HSPA, LTE"},{"2g bands":"GSM 850, 900, 1800, 1900 - SIM 1 & SIM 2 (dual-SIM model only)"},{"3g bands":"HSDPA 850, 900, 1700(AWS), 1900, 2100"},{"4g bands":"2, 3, 4, 5, 7, 8, 12, 17, 28, 66 - USA"},{"speed":"HSPA 42.2/5.76 Mbps, LTE Cat4 150/50 Mbps"}],"body":[{"dimensions":"155.9 x 74.5 x 9.9 mm \n6.14 x 2.93 x 0.39 inches"},{"weight":"179 g (6.31 oz)"},{"build":"Glass front, plastic back, plastic frame"},{"sim":"Single SIM (Nano-SIM) or Hybrid Dual SIM (Nano-SIM, dual stand-by)"}],"platform":[{"os":"Android 11 (Go edition)"},{"chipset":"Mediatek MT6761D Helio A20 (12 nm)"},{"cpu":"Quad-core 1.8 GHz Cortex-A53"},{"gpu":"PowerVR GE8320"}],"memory":[{"card slot":"microSDXC (uses shared SIM slot)"},{"internal":"32GB 2GB RAM"},{"feature":"eMMC 5.1"}],"main camera":[{"cameras":["13 MP, f/1.9, 27mm (wide), 1/3.06\", 1.12µm, AF","2 MP, f/2.4, (macro)"]},{"features":"LED flash, HDR, panorama"},{"video":"1080p@30fps"}],"selfie camera":[{"single":"5 MP, f/2.2, 27mm (wide), 1/5.0\", 1.12µm"},{"features":"HDR"},{"video":"1080p@30fps"}],"misc":[{"colors":"Power Grey, Twilight Blue"},{"models":"4063F"},{"price":"About 110 EUR"}],"launch":[{"announced":"12 January 2021"},{"available":"26 April 2021"}],"sound":[{"loudspeaker":"Yes"},{"3.5mm jack":"Yes"}],"features":[{"sensors":"Fingerprint (rear-mounted), accelerometer, proximity"}],"battery":[{"type":"Li-Ion 3000 mAh, non-removable"}],"description":"Get the alcatel 1L (2021) with 13 MP camera, Li-Ion 3000 mAh battery, Available in Power Grey, and Twilight Blue. Buy now for About 110 EUR.","views":1855754,"loves":2629,"rating":4.6,"category":"alcatel","slug":"alcatel-1l-2021-","image":"/images/pbigpics/alcatel-1l-2021.jpg"},{"hits":1,"fans":1,"popularity":1,"title":"alcatel 1S (2021)","display":[{"type":"IPS"},{"screen":"IPS LCD"},{"display height":6.52},{"display width":102.6},{"screen-to-body":82},{"screen width":720},{"screen height":1600},{"screen ratio":"20:9"},{"ppi":269}],"comms":[{"wlan":"Wi-Fi 802.11 b/g/n, Wi-Fi Direct"},{"bluetooth":"5.0, A2DP, LE"},{"positioning":"GPS, GLONASS, GALILEO, BDS"},{"nfc":"No"},{"radio":"FM radio"},{"usb":"microUSB 2.0, OTG"}],"network":[{"technology":"GSM, HSPA, LTE"},{"2g bands":"GSM 850, 900, 1800, 1900 - SIM 1 & SIM 2 (dual-SIM model only)"},{"3g bands":"HSDPA 850, 900, 1900, 2100"},{"4g bands":"1, 3, 5, 7, 8, 20, 28, 38, 40, 41"},{"speed":"HSPA 42.2/5.76 Mbps, LTE Cat4 150/50 Mbps"}],"body":[{"dimensions":"165.6 x 75.6 x 8.8 mm \n6.52 x 2.98 x 0.35 inches"},{"weight":"190 g (6.70 oz)"},{"build":"Glass front, plastic back, plastic frame"},{"sim":"Single SIM (Nano-SIM) or Hybrid Dual SIM (Nano-SIM, dual stand-by)"}],"platform":[{"os":"Android 11"},{"chipset":"Mediatek MT6762D Helio P22 (12 nm)"},{"cpu":"Octa-core (4x1.8 GHz Cortex-A53 & 4x1.5 GHz Cortex-A53)"},{"gpu":"PowerVR GE8320"}],"memory":[{"card slot":"microSDXC (uses shared SIM slot)"},{"internal":"32GB 3GB RAM"},{"feature":"eMMC 5.1"}],"main camera":[{"cameras":["13 MP, f/2.0, 27mm (wide), 1/3.06\", 1.12µm, PDAF","2 MP, f/2.4, (macro)","2 MP, f/2.4, (depth)"]},{"features":"LED flash, HDR, panorama"},{"video":"1080p@30fps"}],"selfie camera":[{"single":"5 MP, f/2.2, 27mm (wide), 1/5\", 1.12µm"},{"features":"HDR"},{"video":"1080p@30fps"}],"misc":[{"colors":"Elegant Black, Twilight Blue"},{"models":"6025H, 6025H_EEA, 6025D, 6025D_EEA"},{"price":"About 130 EUR"}],"launch":[{"announced":"12 January 2021"},{"available":"25 March 2021"}],"sound":[{"loudspeaker":"Yes"},{"3.5mm jack":"Yes"}],"battery":[{"type":"Li-Po 4000 mAh, non-removable"},{"charging":"10W wired"}],"features":[{"sensors":"Fingerprint (rear-mounted), accelerometer, proximity, compass"}],"description":"Get the alcatel 1S (2021) with 13 MP camera, Li-Po 4000 mAh battery, and 10W wired fast charging. Available in Elegant Black, and Twilight Blue. Buy now for About 130 EUR.","views":2613180,"loves":1870,"rating":3.8,"category":"alcatel","slug":"alcatel-1s-2021-","image":"/images/pbigpics/alcatel-1s-2021.jpg"},{"hits":1,"fans":1,"popularity":1,"title":"alcatel 3L (2021)","display":[{"type":"IPS"},{"screen":"IPS LCD"},{"display height":6.52},{"display width":102.6},{"screen-to-body":82},{"screen width":720},{"screen height":1600},{"screen ratio":"20:9"},{"ppi":269}],"comms":[{"wlan":"Wi-Fi 802.11 b/g/n, Wi-Fi Direct"},{"bluetooth":"5.0, A2DP, LE"},{"positioning":"GPS, GLONASS, GALILEO, BDS"},{"nfc":"Yes"},{"radio":"FM radio"},{"usb":"microUSB 2.0, OTG"}],"network":[{"technology":"GSM, HSPA, LTE"},{"2g bands":"GSM 850, 900, 1800, 1900 - SIM 1 & SIM 2 (dual-SIM model only)"},{"3g bands":"HSDPA 850, 900, 1900, 2100"},{"4g bands":"1, 3, 7, 8, 20, 28"},{"speed":"HSPA 42.2/5.76 Mbps, LTE Cat4 150/50 Mbps"}],"body":[{"dimensions":"165.6 x 75.6 x 8.7 mm \n6.52 x 2.98 x 0.34 inches"},{"weight":"194 g (6.84 oz)"},{"build":"Glass front, plastic back, plastic frame"},{"sim":"Single SIM (Nano-SIM) or Dual SIM (Nano-SIM, dual stand-by)"}],"platform":[{"os":"Android 11"},{"chipset":"Mediatek MT6762D Helio P22 (12 nm)"},{"cpu":"Octa-core (4x1.8 GHz Cortex-A53 & 4x1.5 GHz Cortex-A53)"},{"gpu":"PowerVR GE8320"}],"memory":[{"card slot":"microSDXC (only single sim model)"},{"internal":"64GB 4GB RAM"},{"feature":"eMMC 5.1"}],"main camera":[{"cameras":["48 MP, f/1.8, 26mm (wide), 1/2.0\", 0.8µm, PDAF","2 MP, f/2.4, (macro)","2 MP, f/2.4, (depth)"]},{"features":"LED flash, HDR, panorama"},{"video":"1080p@30fps"}],"selfie camera":[{"single":"8 MP, f/2.0, 26mm (wide), 1/4\", 1.12µm"},{"features":"HDR"},{"video":"1080p@30fps"}],"misc":[{"colors":"Jewelry Blue, Jewelry Black"},{"models":"6056D"},{"price":"About 330 EUR"}],"launch":[{"announced":"12 January 2021"},{"available":"26 April 2021"}],"sound":[{"loudspeaker":"Yes"},{"3.5mm jack":"Yes"}],"battery":[{"type":"Li-Po 4000 mAh, non-removable"},{"charging":"10W wired"}],"features":[{"sensors":"Fingerprint (rear-mounted), accelerometer, proximity, compass"}],"description":"Get the alcatel 3L (2021) with 48 MP camera, Li-Po 4000 mAh battery, and 10W wired fast charging. Available in Jewelry Blue, and Jewelry Black. Buy now for About 330 EUR.","views":4193834,"loves":2799,"rating":4.7,"category":"alcatel","slug":"alcatel-3l-2021-","image":"/images/pbigpics/alcatel-a3l-2021.jpg"},{"hits":1,"fans":1,"popularity":1,"title":"alcatel 1SE (2020)","display":[{"type":"IPS"},{"screen":"IPS LCD"},{"display height":6.22},{"display width":96.6},{"screen-to-body":80.7},{"screen width":720},{"screen height":1520},{"screen ratio":"19:9"},{"ppi":270}],"comms":[{"wlan":"Wi-Fi 802.11 b/g/n, Wi-Fi Direct"},{"bluetooth":"4.2, A2DP"},{"positioning":"GPS"},{"nfc":"No"},{"radio":"FM radio"},{"usb":"microUSB 2.0"}],"network":[{"technology":"GSM, HSPA, LTE"},{"2g bands":"GSM 850, 900, 1800, 1900 - SIM 1 & SIM 2"},{"3g bands":"HSDPA 850, 900, 1900, 2100"},{"4g bands":"1, 3, 7, 8, 20, 28"},{"speed":"HSPA 21.1/5.76 Mbps, LTE Cat4 150/50 Mbps"}],"body":[{"dimensions":"159.2 x 75.2 x 8.7 mm \n6.27 x 2.96 x 0.34 inches"},{"weight":"175 g (6.17 oz)"},{"build":"Glass front, plastic frame, plastic back"},{"sim":"Hybrid Dual SIM (Nano-SIM, dual stand-by)"}],"platform":[{"os":"Android 10"},{"chipset":"Unisoc SC9863A (28nm)"},{"cpu":"Octa-core (4x1.6 GHz Cortex-A55 & 4x1.2 GHz Cortex-A55)"},{"gpu":"IMG8322"}],"memory":[{"card slot":"microSDXC (uses shared SIM slot)"},{"internal":"32GB 3GB RAM, 64GB 2GB RAM, 128GB 4GB RAM"},{"feature":"eMMC 5.1"}],"main camera":[{"cameras":["13 MP, f/2.2, (wide), 1/3.06\", 1.12µm, AF","5 MP, f/2.2, (ultrawide), 1/5.0\", 1.12µm","2 MP, f/2.4, (depth)"]},{"features":"LED flash, HDR, panorama"},{"video":"1080p@30fps"}],"selfie camera":[{"single":"5 MP, f/2.2, (wide), 1/5\", 1.12µm"},{"features":"HDR"},{"video":"1080p@30fps"}],"misc":[{"colors":"Agate Greeen, Power Gray"},{"models":"5030F, 5030U, 5030D_EEA, 5030F_EEA, 5030D, 5030E, 5030A, 5030E_TCL, 5030I, 5030M"},{"price":"About 150 EUR"}],"launch":[{"announced":"28 October 2020"},{"available":"28 October 2020"}],"sound":[{"loudspeaker":"Yes"},{"3.5mm jack":"Yes"}],"features":[{"sensors":"Fingerprint (rear-mounted), accelerometer, proximity"}],"battery":[{"type":"Li-Po 4000 mAh, non-removable"}],"description":"Get the alcatel 1SE (2020) with 13 MP camera, Li-Po 4000 mAh battery, Available in Agate Greeen, and Power Gray. Buy now for About 150 EUR.","views":510988,"loves":493,"rating":4.4,"category":"alcatel","slug":"alcatel-1se-2020-","image":"/images/pbigpics/alcatel-1-se-2020.jpg"}]
// };
// export const viewItem = writable<ViewItemInit>(viewItemInit)
// export const addItemSlug = (slug:string):void => {
//   viewItem.update((items:any)=> ({
//     ...items, slugList: [...items.slugList, slug]
//   }))
// }
// export const addViewItem = (item:object):void => {
//   viewItem.update((items:any) => ({...items, itemsList: [...items.itemsList, item]}))
// }