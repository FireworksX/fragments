import { positionType } from "@fragments/plugin-fragment";
import { to } from "@react-spring/web";
import { useLayerStyleValue } from "@/shared/hooks/useLayerStyles/useLayerStyleValue.ts";
import { LinkKey } from "@graph-state/core";
import { use, useContext, useMemo } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useRenderTarget } from "@/shared/hooks/useRenderTarget.ts";
import { isTopLevel } from "@/shared/helpers";
import { InstanceContext } from "@/components/Instance";

export const useLayerPosition = (layerKey: LinkKey) => {
  const { layerKey: instanceLayerKey } = use(InstanceContext);
  const { manager: fragmentManager } = use(FragmentContext);
  const { isDocument } = useRenderTarget(fragmentManager);
  const isTop = isTopLevel(fragmentManager, layerKey);
  const skipPosition = (isTop && isDocument) || (!!instanceLayerKey && isTop);

  const position$ = useLayerStyleValue(layerKey, "position");
  const top$ = useLayerStyleValue(layerKey, "top");
  const left$ = useLayerStyleValue(layerKey, "left");

  return useMemo(
    () => ({
      position$: skipPosition ? positionType.relative : position$,
      top$: to([position$, top$], (pos, value) =>
        pos === positionType.absolute && !skipPosition ? value : null
      ),
      left$: to([position$, left$], (pos, value) =>
        pos === positionType.absolute && !skipPosition ? value : null
      ),
    }),
    [skipPosition, position$, top$, left$]
  );
};
