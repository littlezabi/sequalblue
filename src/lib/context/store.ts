// src/store/cars.js

import { writable } from "svelte/store";
import Cookies from "js-cookie";

export const ANNOUNCMENTS:any = writable([])
export const ANNOUNCMENTS_ADD = (data:any) => ANNOUNCMENTS.update(()=> {
  return data
})
export const ROTATERY_DATA:any = writable({firms: [], phones:[]})
export const ROTATERY_DATA_ADD = (res:any, type:string) => ROTATERY_DATA.update((ROTATERY_DATA:any) => {
  if(type === 'firms') return {...ROTATERY_DATA, firms: res}
  if(type === 'phones') return {...ROTATERY_DATA, phones: res}
  return res
})

export const __SEARCHS__:any = writable([])
export const ADD_SEARCH_RESULT = (res:any) => __SEARCHS__.update(() => {
  return res
})

const __MESSAGE__ = [{ id: 0, message: "", variant: "" }];
export const MESSAGE = writable(__MESSAGE__);
export const ADD_MESSAGE = (message: { message: string; variant: string }) => {
  MESSAGE.update((MESSAGE) => {
    return [...MESSAGE, { id: MESSAGE[MESSAGE.length - 1].id + 1, ...message }];
  });
};
const CART = Cookies.get("user_cart")
  ? JSON.parse(Cookies.get("user_cart"))
  : { firmware: [] };
export const CART_CONTEXT = writable(CART);
export const CART_ADD = (__item__: any, type: string = "") => {
  CART_CONTEXT.update((CART_CONTEXT) => {
    return CART_CONTEXT
  });
};

const USER = Cookies.get("user_session")
  ? JSON.parse(Cookies.get("user_session"))
  : false;
export const USER_CONTEXT = writable(USER);
export const USER_UPDATE = (user: any) =>
  USER_CONTEXT.update((USER_CONTEXT) => {
    return user;
  });
export const LOGOUT = () => {
  USER_CONTEXT.set(false);
  Cookies.remove("user_session", { path: "/" });
};
// modal
export const MODAL = {
  show: false,
  children: "",
  isClosing: false,
  title: "",
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
  CUSTOM_STATE.update((CUSTOM_STATE) => {
    return { ...CUSTOM_STATE, ...state };
  });
// end custom states
const CARS = [
  { make: "Ford", model: "Taurus", year: "2015" },
  { make: "Toyota", model: "Avalon", year: "2013" },
];

export const cars = writable(CARS);

export const addCar = (car: any) =>
  cars.update((cars) => {
    return [...cars, car];
  });

export const reset = () => {
  cars.set(CARS);
};

// export const cars = {
//     subscribe,
//     addCar,
//     reset
// }
