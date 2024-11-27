import { ExtenderPayload } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

export const visibleProps = ({
  state,
  getValue,
  graphKey,
}: ExtenderPayload<unknown>) => {
  const setter = valueSetter(state, graphKey, "visible");

  return {
    visible: getValue("visible", true),
    toggleVisible: setter,
  };
};
