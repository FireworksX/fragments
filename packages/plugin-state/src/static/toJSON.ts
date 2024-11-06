import { Plugin } from "@graph-state/core";

export const toJSON: Plugin = (state) => {
  state.toJSONState = () => {
    const graphs = state.cache.links.values();
    return Array.from(graphs);
  };
};
