import { ExtenderPayload } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

export const opacityProps = ({
  state,
  getValue,
  graphKey,
}: ExtenderPayload<unknown>) => {
  const opacitySetter = valueSetter(state, graphKey, "opacity");

  return {
    opacity: getValue("opacity", 1),
    setOpacity: opacitySetter,
  };
};
