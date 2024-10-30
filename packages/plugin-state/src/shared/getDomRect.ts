import { LinkKey } from "@graph-state/core";
import { isBrowser } from "@fragments/utils";

export const getDomRect = (graphKey?: LinkKey) => {
  if (isBrowser) {
    const domElement = document.querySelector(`[data-key="${graphKey}"]`);
    if (domElement instanceof HTMLElement) {
      return {
        left: domElement.offsetLeft,
        top: domElement.offsetTop,
        right: domElement.offsetLeft + domElement.offsetWidth,
        bottom: domElement.offsetTop + domElement.offsetHeight,
        width: domElement.offsetWidth,
        height: domElement.offsetHeight,
      };
    }
  }

  return {
    left: null,
    top: null,
    right: null,
    bottom: null,
  };
};
