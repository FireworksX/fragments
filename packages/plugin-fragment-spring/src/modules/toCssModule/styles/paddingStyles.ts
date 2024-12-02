import { GraphState } from "@graph-state/core";
import { getFieldValue, toPx } from "@fragments/plugin-fragment";
import { to } from "@react-spring/web";

export const paddingStyles = (node, cache: GraphState) => {
  // const cachedFlexDirection = createCachedInterpolate(
  //   `{graphKey}-css-flex-direction`
  // );
  // const cachedFlexWrap = createCachedInterpolate(`{graphKey}-css-flex-wrap`);
  // const cachedPadding = createCachedInterpolate(`{graphKey}-css-padding`);

  const padding = getFieldValue(node, "padding", cache);
  const paddingTop = getFieldValue(node, "paddingTop", cache);
  const paddingRight = getFieldValue(node, "paddingRight", cache);
  const paddingBottom = getFieldValue(node, "paddingBottom", cache);
  const paddingLeft = getFieldValue(node, "paddingLeft", cache);

  return {
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
