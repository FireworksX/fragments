import { LinkKey, Plugin } from "@graph-state/core";

export const cssPlugin: Plugin = () => {
  state.generateCss = (layerKey: LinkKey) => {};
};
