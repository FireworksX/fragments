import { GraphState } from "@graph-state/core";
import { getFieldValue, layerDirection } from "@fragments/plugin-fragment";
import { to } from "@react-spring/web";

export const layerStyles = (node, cache: GraphState) => {
  // const cachedFlexDirection = createCachedInterpolate(
  //   `{graphKey}-css-flex-direction`
  // );
  // const cachedFlexWrap = createCachedInterpolate(`{graphKey}-css-flex-wrap`);
  // const cachedPadding = createCachedInterpolate(`{graphKey}-css-padding`);

  return {
    flexDirection: to([getFieldValue(node, "layerDirection", cache)], (value) =>
      value === layerDirection.horizontal ? "row" : "column"
    ),
    alignItems: getFieldValue(node, "layerAlign", cache),
    justifyContent: getFieldValue(node, "layerDistribute", cache),
    flexWrap: to([getFieldValue(node, "layerWrap", cache)], (v) =>
      v ? "wrap" : "nowrap"
    ),
    gap: getFieldValue(node, "layerGap", cache),
  };
};
