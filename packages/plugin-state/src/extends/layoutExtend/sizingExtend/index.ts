import { ExtenderPayload } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { sizing } from "@/definitions.ts";

const DEFAULT_SIZING = sizing.Fixed;

export const sizingExtend = ({
  state,
  graphKey,
  getValue,
}: ExtenderPayload<unknown>) => {
  const layoutSizingHorizontalSetter = valueSetter(
    state,
    graphKey,
    "layoutSizingHorizontal"
  );
  const layoutSizingVerticalSetter = valueSetter(
    state,
    graphKey,
    "layoutSizingVertical"
  );

  const setSizeMode = (
    mode: "horizontal" | "vertical",
    value: typeof sizing
  ) => {
    if (Object.keys(sizing).includes(value)) {
      if (mode === "horizontal") {
        layoutSizingHorizontalSetter(value);
      }
      if (mode === "vertical") {
        layoutSizingVerticalSetter(value);
      }
    }
  };

  return {
    layoutSizingHorizontal: getValue("layoutSizingHorizontal", DEFAULT_SIZING),
    layoutSizingVertical: getValue("layoutSizingVertical", DEFAULT_SIZING),
    setSizeMode,
  };
};
