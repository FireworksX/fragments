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
  const [top] = useLayerValue(layerKey, "top", fragmentManager);
  const [left] = useLayerValue(layerKey, "left", fragmentManager);

  return useMemo(
    () => ({
      position: skipPosition ? definition.positionType.relative : position,
      top:
        position === definition.positionType.absolute && !skipPosition
          ? toPx(top)
          : null,
      left:
        position === definition.positionType.absolute && !skipPosition
          ? toPx(left)
          : null,
    }),
    [skipPosition, position, top]
  );
};
