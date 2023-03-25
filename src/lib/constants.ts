import { dev } from '$app/environment';
export const WEBSITE_NAME = "Sequel Blue";
export const WEBSITE_URL = "http://127.0.0.1:5173/";
export const flaskApiBaseUrl = "http://127.0.0.1:5000";
export const timeAfterAnnouncmentVisi = 10000;
export const itemPerPage = 25;
export const firmsAndFolderPerPage = 20;
export const showAnnouncement = false;
export const latestBlogsLimit = 10;
export const maximumFilesAllowInImageTools = 20;
export const worldActivitiesPostLimit = 15;
export const paginateButtonShow = 6;
export const blogsPagePostLimit = 20;
export const sideBarRandomPostsLength = 15;
export const mainNewArrivalsLimit = 8;
export const mainCatPerCollLimit = 3;
export const sideviewItemsPerColLimit = 4;
export const searchResultLimit = 5;
export const fullSearchResultLimits = 15;
export const fullSearchResultLimitsText = 25;
export const firmsRelatedCategoryLimit = 15;
export const modalRemovingTime = 300;
export const perPostCommentAllow = 5;
export const commentsLimit = 15;
export const SPECIAL_CHARS = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
export const cookiesOptions = {
  path: "/",
  httpOnly: true,
  secure: !dev,
  maxAge: 60 * 60 * 24 * 30 * 12,
};
export const __rating__ = {
  emptyColor: "hsl(240, 80%, 85%)",
  fullColor: "#ff0099",
  showText: false,
  size: 16,
};
