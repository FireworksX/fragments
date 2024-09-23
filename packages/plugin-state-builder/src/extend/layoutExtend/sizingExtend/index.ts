import { ExtenderPayload } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { sizing } from "@fragments/plugin-state";
import { animatableValue } from "@/shared/animatableValue.ts";

const DEFAULT_SIZING = sizing.Fixed;
const ALLOW_SIZES = [sizing.Fixed, sizing.Relative];

export const sizingExtend = ({
  state,
  graphKey,
  getValue,
  resolveField,
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
    getAllowResizeHorizontal: () =>
      ALLOW_SIZES.includes(
        animatableValue(resolveField("layoutSizingHorizontal"))
      ),
    getAllowResizeVertical: () =>
      ALLOW_SIZES.includes(
        animatableValue(resolveField("layoutSizingVertical"))
      ),
    layoutSizingHorizontal: getValue("layoutSizingHorizontal", DEFAULT_SIZING),
    layoutSizingVertical: getValue("layoutSizingVertical", DEFAULT_SIZING),
    setSizeMode,
  };
};
