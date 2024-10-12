import { Extender } from "@/types";
import { LayerProps } from "@/types/props";
import { valueSetter } from "@/shared/valueSetter.ts";

export const layerExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}): LayerProps => {
  return {
    ...graph,
    layerGap: getValue("layerGap", 0),
    setLayerGap(gap: number) {
      if (typeof gap === "number") {
        valueSetter(state, graphKey, "layerGap")(gap);
      }
    },
  };
};
