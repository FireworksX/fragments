import { LinkKey } from "@graph-state/core";
import { useContext, useMemo } from "preact/compat";
import { isTopLevel } from "@/shared/helpers";
import { InstanceContext } from "@/components/Instance";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget";
import { definition } from "@fragmentsx/definition";

export const useLayerPosition = (layerKey: LinkKey) => {
  const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  // const instanceLayerKey = null;
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { isDocument } = useRenderTarget();
  const isTop = isTopLevel(fragmentManager, layerKey);
  const skipPosition = (isTop && isDocument) || (!!instanceLayerKey && isTop);

  const [position] = useLayerValue(layerKey, "position");
  const [top] = useLayerValue(layerKey, "top");
  const [left] = useLayerValue(layerKey, "left");

  return useMemo(
    () => ({
      position: skipPosition ? definition.positionType.relative : position,
      top:
        position === definition.positionType.absolute && !skipPosition
          ? top
          : null,
      left:
        position === definition.positionType.absolute && !skipPosition
          ? left
          : null,
    }),
    [skipPosition, position, top]
  );
};
