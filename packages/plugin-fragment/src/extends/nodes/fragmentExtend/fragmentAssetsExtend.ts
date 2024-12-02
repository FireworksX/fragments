import { Extender } from "@/types";
import { Entity } from "@graph-state/core";

export const fragmentAssetsExtend: Extender = ({ graph, graphKey, state }) => {
  return {
    ...graph,
    solidPainStyles: [],
    addSolidPaintStyle: (paintStyle: Entity) => {
      state.mutate(graphKey, { solidPainStyles: [paintStyle] });
    },
  };
};
