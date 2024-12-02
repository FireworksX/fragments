import { Extender } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { isValue } from "@fragments/utils";
import { baseExtend } from "@/extends/baseExtend";

export const cornerExtend: Extender = ({
  graphKey,
  graph,
  state,
  getValue,
}) => {
  const isMixedRadius = () =>
    !isValue(state.resolveValue(graphKey, "cornerRadius"));

  const setRadius = (fieldKey: string, value: number | null) => {
    const radiusSetter = valueSetter(state, graphKey, fieldKey);
    radiusSetter(value);
  };

  return {
    ...graph,
    cornerRadius: getValue("cornerRadius", 0),
    topLeftRadius: getValue("topLeftRadius", 0),
    topRightRadius: getValue("topRightRadius", 0),
    bottomLeftRadius: getValue("bottomLeftRadius", 0),
    bottomRightRadius: getValue("bottomRightRadius", 0),
    isMixedRadius,

    setCornerRadius(...args) {
      const isSide = args.length > 1;
      const side = isSide ? args[0] : undefined;
      const value = isSide ? args[1] : args[0];

      if (isSide) {
        setRadius("cornerRadius", null);
        const fieldKeyMap = {
          tl: "topLeftRadius",
          tr: "topRightRadius",
          bl: "bottomLeftRadius",
          br: "bottomRightRadius",
        };
        setRadius(fieldKeyMap[side], value);
      } else {
        setRadius("cornerRadius", value);
      }
    },
  };
};

cornerExtend.symbol = Symbol("cornerExtend");
