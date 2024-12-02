import { Extender } from "../../../types";
import { valueSetter } from "../../../shared/valueSetter.ts";

export const textExtend: Extender = ({ graphKey, getValue, state, graph }) => {
  return {
    ...graph,
    content: getValue("content", ""),
    setContent: valueSetter(state, graphKey, "content"),
  };
};
