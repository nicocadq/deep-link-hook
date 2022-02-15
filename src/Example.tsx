import { useState } from "react";

import { DeepLinkConfig } from "./types";
import { useDeepLink } from "./useDeepLink";
import { getPlatform } from "./utils";

export function Example() {
  const deepLink: DeepLinkConfig = {
    android: {
      appURL: "fb://example.com",
      storeURL:
        "https://play.google.com/store/apps/details?id=com.instagram.android",
    },
    ios: {
      appURL: "instagram://user?username=instagram",
      storeURL: "https://apps.apple.com/us/app/instagram/id389801252",
    },
  };

  const [isBack, setIsBack] = useState(false);

  const platform = getPlatform();
  const appURL = deepLink[platform].appURL;
  const storeURL = deepLink[platform].storeURL;

  const { open } = useDeepLink({
    onFallback: function () {
      window.location = storeURL as unknown as Location;
    },
    onReturn: function () {
      setIsBack(true);
    },
  });

  const onClick = () => {
    open(appURL);
  };

  return (
    <div>
      <button onClick={onClick}>Link</button>
      {isBack && <p>Back</p>}
    </div>
  );
}
