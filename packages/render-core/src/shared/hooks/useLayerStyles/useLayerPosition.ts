import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { isTopLevel } from "@/shared/helpers";
import { InstanceContext } from "@/components/Instance";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { positionType } from "@/definitions";

export const useLayerPosition = (layerKey: LinkKey) => {
  // const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  const instanceLayerKey = null;
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { isDocument } = useRenderTarget(fragmentManager);
  const isTop = isTopLevel(fragmentManager, layerKey);
  const skipPosition = (isTop && isDocument) || (!!instanceLayerKey && isTop);

  const [position] = useLayerValue(layerKey, "position");
  const [top] = useLayerValue(layerKey, "top");
  const [left] = useLayerValue(layerKey, "left");

  return useMemo(
    () => ({
      position: skipPosition ? positionType.relative : position,
      top: position === positionType.absolute && !skipPosition ? top : null,
      left: position === positionType.absolute && !skipPosition ? left : null,
    }),
    [skipPosition, position, top]
  );
};
