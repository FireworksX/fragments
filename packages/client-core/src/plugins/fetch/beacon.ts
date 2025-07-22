import { isBrowser } from "@fragmentsx/utils";

export const fetchBeacon = (baseUrl: string) => {
  const sender =
    isBrowser && typeof navigator?.sendBeacon === "function"
      ? navigator.sendBeacon
      : () => null;

  const sendBeacon = (data?: unknown) => {
    try {
      sender("/graphql", "test");
    } catch (e) {
      console.error(e);
    }
  };

  return {
    sendBeacon,
  };
};
