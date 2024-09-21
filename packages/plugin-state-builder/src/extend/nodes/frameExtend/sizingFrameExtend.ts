import { Extender } from "@/types";
import { animatableValue } from "@/shared/animatableValue.ts";
import { sizing } from "@fragments/plugin-state";

const ALLOW_SIZES = [sizing.Fixed, sizing.Relative];

export const sizingFrameExtend: Extender = ({ resolveField }) => {
  return {
    getAllowResizeHorizontal: () =>
      ALLOW_SIZES.includes(
        animatableValue(resolveField("layoutSizingHorizontal"))
      ),
    getAllowResizeVertical: () =>
      ALLOW_SIZES.includes(
        animatableValue(resolveField("layoutSizingVertical"))
      ),
  };
};
