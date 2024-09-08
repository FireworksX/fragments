import { Extender } from "@/types";
import { Entity } from "@graph-state/core";

export const fragmentExtend: Extender = ({
  graphKey,
  graph,
  state,
  getValue,
}) => {
  return {
    ...graph,
    props: getValue("props", []),
    addProp: (variable) => {
      state.mutate(graphKey, {
        props: [variable],
      });
    },
    removeProp: (prop: Entity) => {
      state.invalidate(prop);
    },
  };
};
