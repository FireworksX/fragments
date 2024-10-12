import { Extender } from "@/types";
import { Color } from "@/types/props.ts";

export const solidPaintStyleExtend: Extender = ({ graph, state, graphKey }) => {
  return {
    ...graph,
    rename(name: string) {
      state.mutate(graphKey, { name });
    },
    update(color: Color) {
      state.mutate(graphKey, { color });
    },
  };
};
