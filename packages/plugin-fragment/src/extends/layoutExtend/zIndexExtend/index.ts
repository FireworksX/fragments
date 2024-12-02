import { ExtenderPayload } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

export const zIndexExtend = ({
  graphKey,
  getValue,
  state,
}: ExtenderPayload<unknown>) => {
  const zIndexSetter = valueSetter(state, graphKey, "zIndex");

  return {
    zIndex: getValue("zIndex"),
    setZIndex: zIndexSetter,
  };
};
