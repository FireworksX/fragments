import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { isTopLevel } from "@/shared/helpers";
import { InstanceContext } from "@/components/Instance";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { definition } from "@fragmentsx/definition";
import { isFiniteNumber, toPx } from "@fragmentsx/utils";
import { useLayerSizeValue } from "@/shared/hooks/useLayerStyles/useLayerSizeValue";

export const useLayerPositionNew = (layerKey: LinkKey) => {
  const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { isDocument } = useRenderTarget();
  const isTop = isTopLevel(fragmentManager, layerKey);
  const widthCalc = useLayerSizeValue(layerKey, "width");
  const heightCalc = useLayerSizeValue(layerKey, "height");

  const [position] = useLayerValue(layerKey, "position");

  const [, , { resultValue: width$ }] = useLayerValue(layerKey, "width");
  const [, , { resultValue: height$ }] = useLayerValue(layerKey, "height");

  const [, , { resultValue: centerAnchorX$ }] = useLayerValue(
    layerKey,
    "centerAnchorX"
  );
  const [, , { resultValue: centerAnchorY$ }] = useLayerValue(
    layerKey,
    "centerAnchorY"
  );

  const [, , { resultValue: top$, rawValue: baseTop }] = useLayerValue(
    layerKey,
    "top"
  );
  const [, , { resultValue: left$, rawValue: baseLeft }] = useLayerValue(
    layerKey,
    "left"
  );
  const [, , { resultValue: right$, rawValue: baseRight }] = useLayerValue(
    layerKey,
    "right"
  );
  const [, , { resultValue: bottom$, rawValue: baseBottom }] = useLayerValue(
    layerKey,
    "bottom"
  );

  const skipPosition = (isTop && isDocument) || (!!instanceLayerKey && isTop);

  const toWidth = to(width$, (value) => widthCalc(value));
  const toHeight = to(height$, (value) => heightCalc(value));

  if (isTop && !skipPosition) {
    return {
      position: definition.positionType.absolute,
      top: top$,
      left: left$,
      width: toWidth,
      height: toHeight,
    };
  }

  if (position === definition.positionType.relative || skipPosition) {
    return {
      position: definition.positionType.relative,
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

export const useLayerPosition = (layerKey: LinkKey) => {
  const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { isDocument } = useRenderTarget();
  const isTop = isTopLevel(fragmentManager, layerKey);
  const skipPosition = (isTop && isDocument) || (!!instanceLayerKey && isTop);

  const [position] = useLayerValue(layerKey, "position", fragmentManager);
  const [centerAnchorX] = useLayerValue(
    layerKey,
    "centerAnchorX",
    fragmentManager
  );
  const [centerAnchorY] = useLayerValue(
    layerKey,
    "centerAnchorY",
    fragmentManager
  );
  const [top] = useLayerValue(layerKey, "top", fragmentManager);
  const [left] = useLayerValue(layerKey, "left", fragmentManager);
  const [right] = useLayerValue(layerKey, "right", fragmentManager);
  const [bottom] = useLayerValue(layerKey, "bottom", fragmentManager);

  return useMemo(() => {
    if (skipPosition) {
      return {
        position: definition.positionType.relative,
      };
    }

    let nextLeft = left !== null ? toPx(left) : `${centerAnchorX * 100}%`;
    // let nextRight = null;
    let [transformX, transformY] = [
      left !== null || right !== null ? null : "50%",
      top !== null || bottom !== null ? null : "50%",
    ];

    // if (left !== null) {
    //
    // }

    // if (!!left) {
    //   nextLeft = `${left}px`;
    //   // transform = "translateY(-50%)";
    // } else if (!!right) {
    //   nextRight = `${right}px`;
    //   // transform = "translateY(-50%)";
    // } else if (block.constraints.centerX !== null) {
    //   styles.left = `${block.constraints.centerX * 100}%`;
    //   styles.transform = styles.transform
    //     ? "translate(-50%, -50%)"
    //     : "translate(-50%)";
    // }

    // console.log(nextLeft);

    return {
      position: skipPosition ? definition.positionType.relative : position,
      top:
        position === definition.positionType.absolute && !skipPosition
          ? toPx(top)
          : null,
      left:
        position === definition.positionType.absolute && !skipPosition
          ? nextLeft
          : null,
    };
  }, [skipPosition, position, top, centerAnchorX, centerAnchorX]);
};
