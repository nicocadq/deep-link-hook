import { useCallback, useLayoutEffect, useMemo, useState } from "react";

import { Options, Listener } from "./types";

/*
 * @param options: {
 *    fallbackTimeout: number -> time to wait before consider something went wrong with the deep link,
 *    onReturn: () => void -> callback to call when the user returns to the app,
 *    onFallback: () => void -> callback to call when something went wrong with the deep link,
 *  }
 */

const defaultOptions: Options = {
  fallbackTimeout: 2500,
};

export const useDeepLink = (userOptions: Options) => {
  const options: Options = useMemo(
    () => ({ ...defaultOptions, ...userOptions }),
    [userOptions]
  );

  const [hasFocus, setHasFocus] = useState(true);
  const [didHide, setDidHide] = useState(false);

  const onBlur = useCallback(() => {
    setHasFocus(false);
  }, []);

  const onVisibilityChange = useCallback((event) => {
    if (event.target.visibilityState === "hidden") {
      setDidHide(true);
    }
  }, []);

  const onFocus = useCallback(() => {
    if (didHide) {
      options.onReturn?.();

      setDidHide(false);
    }

    setHasFocus(true);
  }, [didHide, hasFocus, options]);

  const setupListeners = useCallback(
    (mode: "add" | "remove") => {
      const listeners: Listener[] = [
        { element: window, event: "blur", handler: onBlur },
        {
          element: document,
          event: "visibilitychange",
          handler: onVisibilityChange,
        },
        { element: window, event: "focus", handler: onFocus },
      ];

      listeners.forEach(({ element, event, handler }) => {
        element[mode + "EventListener"](event, handler);
      });
    },
    [onBlur, onFocus, onVisibilityChange]
  );

  useLayoutEffect(() => {
    setupListeners("add");

    return () => {
      setupListeners("remove");
    };
  }, [setupListeners]);

  const open = useCallback(
    (url) => {
      setTimeout(() => {
        if (hasFocus && options.onFallback) {
          options.onFallback();
        }
      }, options.fallbackTimeout);

      window.location = url;
    },
    [hasFocus, options]
  );

  return { open };
};
