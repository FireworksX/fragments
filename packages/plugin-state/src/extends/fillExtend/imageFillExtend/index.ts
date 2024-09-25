import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

export const imageFillExtend: Extender = ({ graphKey, state, getValue }) => {
  return {
    imageFill: getValue("imageFill"),
    imageFillScaleMode: getValue("imageFillScaleMode"),
    setImageFill: valueSetter(state, graphKey, "imageFill"),
    setImageFillScaleMode: valueSetter(state, graphKey, "imageFillScaleMode"),
  };
};
