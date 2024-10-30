import { ExtenderPayload } from "@/types";
import { valueSetter } from "@/shared/valueSetter.ts";
import { sizing } from "@fragments/plugin-state";
import { animatableValue } from "@/shared/animatableValue.ts";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";

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

  const horizontalInterpolate = createCachedInterpolate();
  const verticalInterpolate = createCachedInterpolate();

  return {
    getAllowResizeHorizontal: () => {
      const sizing$ = resolveField("layoutSizingHorizontal");
      return horizontalInterpolate([sizing$], (sizing) =>
        ALLOW_SIZES.includes(sizing)
      );
    },
    getAllowResizeVertical: () => {
      const sizing$ = resolveField("layoutSizingVertical");
      return verticalInterpolate([sizing$], (sizing) =>
        ALLOW_SIZES.includes(sizing)
      );
    },
    layoutSizingHorizontal: getValue("layoutSizingHorizontal", DEFAULT_SIZING),
    layoutSizingVertical: getValue("layoutSizingVertical", DEFAULT_SIZING),
    setSizeMode,
  };
};
