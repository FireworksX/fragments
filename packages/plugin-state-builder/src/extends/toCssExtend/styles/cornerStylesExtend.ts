import { to } from "@react-spring/web";
import { Extender } from "@/types";
import { toPx } from "@/shared/toPx.ts";
import { createConstantInterpolate } from "@/shared/createConstantInterpolate.ts";
import { createCachedInterpolate } from "@/shared/cachedInterpolate.ts";

export const cornerStylesExtend: Extender = ({ resolveField }) => {
  const cachedBorderRadius = createCachedInterpolate(``);
  const cornerRadius = resolveField("cornerRadius");
  const topLeftRadius = resolveField("topLeftRadius");
  const topRightRadius = resolveField("topRightRadius");
  const bottomLeftRadius = resolveField("bottomLeftRadius");
  const bottomRightRadius = resolveField("bottomRightRadius");

  return {
    borderRadius: cachedBorderRadius(
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
