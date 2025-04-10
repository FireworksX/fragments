import { useContext, useMemo } from "react";
import { LinkKey } from "@graph-state/core";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { definition } from "@fragmentsx/definition";
import { useRenderTarget } from "@/hooks/useRenderTarget";
import { isTopLevel } from "@fragmentsx/render-core";
import { useLayerValue } from "@/hooks/useLayerValue";
import { InstanceContext } from "@/components/Instance";

export const useLayerPosition = (layerKey: LinkKey) => {
  const { layerKey: instanceLayerKey } = useContext(InstanceContext);
  const { manager: fragmentManager } = useContext(FragmentContext);
  const { isDocument, renderTarget } = useRenderTarget();
  const isTop = isTopLevel(fragmentManager, layerKey);
  const skipPosition = (isTop && isDocument) || (!!instanceLayerKey && isTop);

  const [position] = useLayerValue(layerKey, "position", fragmentManager);
  const [, , { resultValue: top }] = useLayerValue(
    layerKey,
    "top",
    fragmentManager
  );
  const [, , { resultValue: left }] = useLayerValue(
    layerKey,
    "left",
    fragmentManager
  );

  return {
    position: skipPosition ? definition.positionType.relative : position,
    top:
      position === definition.positionType.absolute && !skipPosition
        ? top
        : null,
    left:
      position === definition.positionType.absolute && !skipPosition
        ? left
        : null,
  };
};
