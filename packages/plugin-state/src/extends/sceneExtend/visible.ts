import { ExtenderPayload } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";

export const visibleProps = ({
  state,
  getValue,
  graphKey,
}: ExtenderPayload<unknown>) => {
  const visibleSetter = valueSetter(state, graphKey, "visible");

  const toggleVisible = (forceValue?: boolean) => {
    const visible = state.resolve(graphKey).visible;
    visibleSetter(forceValue ?? !visible);
  };

  return {
    visible: getValue("visible", true),
    toggleVisible,
  };
};
