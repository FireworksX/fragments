import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { borderType } from "@/definitions.ts";
import { baseExtend } from "@/extends/baseExtend";

export const borderExtend: Extender = ({
  graph,
  graphKey,
  state,
  getValue,
}) => {
  const borderTypeSetter = valueSetter(state, graphKey, "borderType");
  const borderWidthSetter = valueSetter(state, graphKey, "borderWidth");
  const borderColorSetter = valueSetter(state, graphKey, "borderColor");

  return {
    ...graph,
    borderType: getValue("borderType", borderType.None),
    borderWidth: getValue("borderWidth", 1),
    borderColor: getValue("borderColor"),

    setBorderType: borderTypeSetter,
    setBorderWidth: borderWidthSetter,
    setBorderColor: borderColorSetter,
  };
};

borderExtend.symbol = Symbol("borderExtend");
