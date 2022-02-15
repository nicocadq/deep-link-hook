import { PLATFORM } from "./types";

const ANDROID = "android";
const IOS = "ios";

export const isAndroid = (): boolean => {
  return navigator.userAgent.indexOf("Android") !== -1;
};

export const isIOS = (): boolean => {
  return navigator.userAgent.indexOf("iPhone") !== -1;
};

export const getPlatform = (): PLATFORM => {
  if (isIOS()) {
    return IOS;
  }

  return ANDROID;
};
