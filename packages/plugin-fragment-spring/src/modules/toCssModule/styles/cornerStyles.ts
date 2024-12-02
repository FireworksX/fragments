import { getFieldValue, toPx } from "@fragments/plugin-fragment";
import { to } from "@react-spring/web";

export const cornerStyles = (node, cache) => {
  const cornerRadius = getFieldValue(node, "cornerRadius", cache);
  const topLeftRadius = getFieldValue(node, "topLeftRadius", cache);
  const topRightRadius = getFieldValue(node, "topRightRadius", cache);
  const bottomLeftRadius = getFieldValue(node, "bottomLeftRadius", cache);
  const bottomRightRadius = getFieldValue(node, "bottomRightRadius", cache);

  return {
    borderRadius: to(
      [
        cornerRadius,
        topLeftRadius,
        topRightRadius,
        bottomLeftRadius,
        bottomRightRadius,
      ],
      (radius, tl, tr, bl, br) =>
        !radius
          ? `${toPx(tl)} ${toPx(tr)} ${toPx(br)} ${toPx(bl)}`
          : toPx(radius)
    ),
  };
};
