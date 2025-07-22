import { isLinkKey, LinkKey } from "@graph-state/core";

export const getStylesheetKey = (fragmentKey?: LinkKey): string => {
  const isLink = isLinkKey(fragmentKey);
  if (isLink) {
    const [type, id] = fragmentKey.split(":");

    return `stylesheet-${id}`;
  }

  return `stylesheet-${fragmentKey ?? "unknown"}`;
};
