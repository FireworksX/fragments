import { LinkKey } from "@graph-state/core";
import { isBrowser } from "@fragments/utils";

export const getDOMTarget = (graphKey: LinkKey) => {
  if (isBrowser) {
    return document.querySelector(`[data-key="${graphKey}"]`);
  }
  return null;
};
