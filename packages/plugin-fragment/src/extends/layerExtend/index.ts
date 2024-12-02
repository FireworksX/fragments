import { Extender } from "@/types";
import { LayerProps } from "@/types/props";
import {
  layerAlign,
  layerDirection,
  layerDistribute,
  layerMode,
} from "@/definitions.ts";
import { valueSetter } from "@/shared/valueSetter.ts";
import { layoutExtend } from "@/extends/layoutExtend";

export const layerExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}): LayerProps => {
  return {
    ...graph,
    layerMode: getValue("layerMode", layerMode.none),
    layerAlign: getValue("layerAlign", layerAlign.start),
    layerDirection: getValue("layerDirection", layerDirection.horizontal),
    layerDistribute: getValue("layerDistribute", layerDistribute.start),
    layerWrap: getValue("layerWrap", false),
    layerGap: getValue("layerGap", 0),

    setLayerMode(mode: typeof layerMode) {
      if (Object.keys(layerMode).includes(mode)) {
        valueSetter(state, graphKey, "layerMode")(mode);
      }
    },
    setLayerDirection(direction: typeof layerDirection) {
      if (Object.keys(layerDirection).includes(direction)) {
        valueSetter(state, graphKey, "layerDirection")(direction);
      }
    },
    setLayerDistribute(distribute: typeof layerDistribute) {
      if (Object.keys(layerDistribute).includes(distribute)) {
        valueSetter(state, graphKey, "layerDistribute")(distribute);
      }
    },
    setLayerAlign(align: typeof layerAlign) {
      if (Object.keys(layerAlign).includes(align)) {
        valueSetter(state, graphKey, "layerAlign")(align);
      }
    },
    setLayerWrap(isWrap: boolean) {
      if (typeof isWrap === "boolean") {
        valueSetter(state, graphKey, "layerWrap")(isWrap);
      }
    },
    setLayerGap(gap: number) {
      if (typeof gap === "number") {
        valueSetter(state, graphKey, "layerGap")(gap);
      }
    },
  };
};

layerExtend.symbol = Symbol("layerExtend");
