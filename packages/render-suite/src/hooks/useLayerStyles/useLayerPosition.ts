import { useContext, useMemo } from "react";
import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import {
  useRenderTarget,
  isTopLevel,
  useLayerSizeValue,
  FragmentContext,
  InstanceContext,
} from "@fragmentsx/render-react";
import { useLayerValue } from "@/hooks/useLayerValue";
import { to } from "@react-spring/web";
import { isFiniteNumber, toPx } from "@fragmentsx/utils";

export const useLayerPosition = (layerKey: LinkKey) => {
  const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { isDocument, renderTarget } = useRenderTarget();
  const isTop = isTopLevel(fragmentManager, layerKey);
  const widthCalc = useLayerSizeValue(layerKey, "width");
  const heightCalc = useLayerSizeValue(layerKey, "height");

  const [position] = useLayerValue(layerKey, "position", fragmentManager);

  const [, , { resultValue: width$ }] = useLayerValue(
    layerKey,
    "width",
    fragmentManager
  );
  const [, , { resultValue: height$ }] = useLayerValue(
    layerKey,
    "height",
    fragmentManager
  );

  const [, , { resultValue: centerAnchorX$ }] = useLayerValue(
    layerKey,
    "centerAnchorX",
    fragmentManager
  );
  const [, , { resultValue: centerAnchorY$ }] = useLayerValue(
    layerKey,
    "centerAnchorY",
    fragmentManager
  );

  const [, , { resultValue: top$, rawValue: baseTop }] = useLayerValue(
    layerKey,
    "top",
    fragmentManager
  );
  const [, , { resultValue: left$, rawValue: baseLeft }] = useLayerValue(
    layerKey,
    "left",
    fragmentManager
  );
  const [, , { resultValue: right$, rawValue: baseRight }] = useLayerValue(
    layerKey,
    "right",
    fragmentManager
  );
  const [, , { resultValue: bottom$, rawValue: baseBottom }] = useLayerValue(
    layerKey,
    "bottom",
    fragmentManager
  );

  const skipPosition = (isTop && isDocument) || (!!instanceLayerKey && isTop);

  const toWidth = to(width$, (value) => widthCalc(value));
  const toHeight = to(height$, (value) => heightCalc(value));

  if (isTop) {
    return {
      position: definition.positionType.absolute,
      top: top$,
      left: left$,
      width: toWidth,
      height: toHeight,
    };
  }

  if (position === definition.positionType.relative) {
    return {
      position,
      width: to(width$, (value) => widthCalc(value)),
      height: to(height$, (value) => heightCalc(value)),
    };
  }

  return {
    position,
    left: to([left$, centerAnchorX$], (value, centerX) =>
      isFiniteNumber(baseLeft)
        ? value
        : !isFiniteNumber(baseRight)
        ? `${centerX * 100}%`
        : null
    ),
    top: to([top$, centerAnchorY$], (value, centerY) =>
      isFiniteNumber(baseTop)
        ? value
        : !isFiniteNumber(baseBottom)
        ? `${centerY * 100}%`
        : null
    ),
    right: isFiniteNumber(baseRight) ? right$ : null,
    bottom: isFiniteNumber(baseBottom) ? bottom$ : null,
    width: to(width$, (width) => {
      if (isFiniteNumber(baseLeft) && isFiniteNumber(baseRight)) {
        return null;
      }

      return widthCalc(width);
    }),
    height: to(height$, (height) => {
      if (isFiniteNumber(baseTop) && isFiniteNumber(baseBottom)) {
        return null;
      }

      return heightCalc(height);
    }),
    x: isFiniteNumber(baseLeft) || isFiniteNumber(baseRight) ? null : "-50%",
    y: isFiniteNumber(baseTop) || isFiniteNumber(baseBottom) ? null : "-50%",
  };
};
