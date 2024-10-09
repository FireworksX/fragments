import { ScreenNode } from "@/types/nodes.ts";
import { Extender } from "@/types";
import { nodes, sizing } from "@/definitions.ts";

export const breakpointExtend: Extender = ({
  state,
  graph,
  graphKey,
}): ScreenNode => {
  return {
    ...graph,
    isPrimary: graph?.isPrimary ?? false,
    minWidth: graph?.minWidth ?? 320,
    width: 100,
    layoutSizingHorizontal: sizing.Relative,
    setPrimary: () => {
      const primaryScreen = state
        .inspectFields(nodes.Screen)
        .map(state.resolve)
        .find((s) => s.isPrimary);

      state.mutate(graphKey, {
        isPrimary: true,
      });

      if (primaryScreen) {
        state.mutate(state.keyOfEntity(primaryScreen), {
          isPrimary: false,
        });
      }
    },
  };
};
