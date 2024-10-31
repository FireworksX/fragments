import { to } from "@react-spring/web";
import { Extender } from "@/types";
import { toPx } from "@/shared/toPx.ts";

export const cornerStylesExtend: Extender = ({ resolveField }) => {
  const cornerRadius = resolveField("cornerRadius");
  const topLeftRadius = resolveField("topLeftRadius");
  const topRightRadius = resolveField("topRightRadius");
  const bottomLeftRadius = resolveField("bottomLeftRadius");
  const bottomRightRadius = resolveField("bottomRightRadius");

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
