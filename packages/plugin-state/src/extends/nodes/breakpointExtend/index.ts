import { ScreenNode } from "@/types/nodes.ts";
import { Extender } from "@/types";
import { nodes, sizing } from "@/definitions.ts";

export const breakpointExtend: Extender = ({ state, graph }): ScreenNode => {
  return {
    ...graph,
    isPrimary: graph?.isPrimary ?? false,
    width: graph?.width ?? 320,
    setPrimary: () => {
      const primaryScreen = state
        .inspectFields(nodes.Screen)
        .map(state.resolve)
        .find((s) => s.isPrimary);

      state.mutate(key, {
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
