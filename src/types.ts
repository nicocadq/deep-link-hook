export interface Options {
  fallbackTimeout?: number;
  onReturn?: () => void;
  onFallback?: () => void;
}

export interface Listener {
  element: any;
  event: string;
  handler: any;
}

export type PLATFORM = "ios" | "android";

export interface DeepLink {
  appURL: string;
  storeURL: string;
}

export type DeepLinkConfig = {
  [name in PLATFORM]: DeepLink;
};
