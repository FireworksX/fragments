import { PaddingProps } from "src/types/props";
import { Extender } from "@/types";
import { isValue } from "@fragments/utils";
import { valueSetter } from "@/shared/valueSetter.ts";

export const paddingExtend: Extender = ({
  graph,
  graphKey,
  getValue,
  state,
}): PaddingProps => {
  const isMixedPadding = () =>
    !isValue(state.resolveValue(graphKey, "padding"));

  const setPadding = (fieldKey: string, value: number | null) =>
    valueSetter(state, graphKey, fieldKey)(value);

  return {
    ...graph,
    padding: getValue("padding", 0),
    paddingLeft: getValue("paddingLeft", 0),
    paddingRight: getValue("paddingRight", 0),
    paddingTop: getValue("paddingTop", 0),
    paddingBottom: getValue("paddingBottom", 0),
    isMixedPadding,

    setPadding(...args) {
      const isSide = args.length > 1;
      const side = isSide ? args[0] : undefined;
      const value = isSide ? args[1] : args[0];

      if (isSide) {
        setPadding("padding", null);
        const fieldKeyMap = {
          top: "paddingTop",
          right: "paddingRight",
          bottom: "paddingBottom",
          left: "paddingLeft",
        };
        setPadding(fieldKeyMap[side], value);
      } else {
        setPadding("padding", value);
      }
    },
  };
};

paddingExtend.symbol = Symbol("paddingExtend");
