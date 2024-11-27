import { layerDirection, layerMode } from "@fragments/plugin-state";
import { Extender } from "@/types";
import { toPx } from "@/shared/toPx.ts";
import { createConstantInterpolate } from "@/shared/createConstantInterpolate.ts";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";

export const layoutStylesExtend: Extender = ({ resolveField, graphKey }) => {
  const cachedFlexDirection = createCachedInterpolate(
    `${graphKey}-css-flex-direction`
  );
  const cachedFlexWrap = createCachedInterpolate(`${graphKey}-css-flex-wrap`);
  const cachedPadding = createCachedInterpolate(`${graphKey}-css-padding`);

  const padding = resolveField("padding");
  const paddingTop = resolveField("paddingTop");
  const paddingRight = resolveField("paddingRight");
  const paddingBottom = resolveField("paddingBottom");
  const paddingLeft = resolveField("paddingLeft");

  return {
    flexDirection: cachedFlexDirection(
      [resolveField("layerDirection")],
      (value) => (value === layerDirection.horizontal ? "row" : "column")
    ),
    alignItems: resolveField("layerAlign"),
    justifyContent: resolveField("layerDistribute"),
    flexWrap: cachedFlexWrap([resolveField("layerWrap")], (v) =>
      v ? "wrap" : "nowrap"
    ),
    gap: resolveField("layerGap"),
    padding: cachedPadding(
      [padding, paddingTop, paddingRight, paddingBottom, paddingLeft],
      (padding, paddingTop, paddingRight, paddingBottom, paddingLeft) => {
        if (!padding) {
          return `${toPx(paddingTop)} ${toPx(paddingRight)} ${toPx(
            paddingBottom
          )} ${toPx(paddingLeft)}`;
        }

        return `${toPx(padding)}`;
      }
    ),
  };
};
