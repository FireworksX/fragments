import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

export const fragmentSizeExtend: Extender = ({
  graph,
  state,
  graphKey,
  getValue,
}) => {
  const widthSetter = valueSetter(state, graphKey, "width");
  const heightSetter = valueSetter(state, graphKey, "height");

  return {
    ...graph,
    width: getValue("width"),
    height: getValue("height"),
    setWidth: widthSetter,
    setHeight: heightSetter,
  };
};
