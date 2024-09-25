import { Plugin } from "@graph-state/core";
import { toJSON } from "@/static/toJSON.ts";

export const addStatic: Plugin = (state) => {
  toJSON(state);
};
