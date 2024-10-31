import { to } from "@react-spring/web";
import { layerDirection, layerMode } from "@fragments/plugin-state";
import { Extender } from "@/types";
import { toPx } from "@/shared/toPx.ts";

export const layoutStylesExtend: Extender = ({ resolveField }) => {
  const isFlex = to(
    resolveField("layerMode"),
    (mode) => mode === layerMode.flex
  );

  const padding = resolveField("padding");
  const paddingTop = resolveField("paddingTop");
  const paddingRight = resolveField("paddingRight");
  const paddingBottom = resolveField("paddingBottom");
  const paddingLeft = resolveField("paddingLeft");

  return {
    display: to(isFlex, (value) => (value ? "flex" : "block")),
    flexDirection: to(resolveField("layerDirection"), (value) =>
      value === layerDirection.horizontal ? "row" : "column"
    ),
    alignItems: resolveField("layerAlign"),
    justifyContent: resolveField("layerDistribute"),
    flexWrap: to(resolveField("layerWrap"), (v) => (v ? "wrap" : "nowrap")),
    gap: resolveField("layerGap"),
    padding: to(
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
