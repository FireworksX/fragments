import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { isTopLevel } from "@/shared/helpers";
import { InstanceContext } from "@/components/Instance";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { definition } from "@fragmentsx/definition";
import { toPx } from "@fragmentsx/utils";

export const useLayerPosition = (layerKey: LinkKey) => {
  const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  // const instanceLayerKey = null;
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
