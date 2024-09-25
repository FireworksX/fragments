import { Extender, ExtenderPayload } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

export const overflowExtend: Extender = ({
  state,
  getValue,
  graphKey,
}: ExtenderPayload<unknown>) => {
  const overflowSetter = valueSetter(state, graphKey, "overflow");

  return {
    overflow: getValue("overflow", "hidden"),
    setOverflow: overflowSetter,
  };
};
