import { ElementType, useContext, useMemo } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useGraph } from "@graph-state/react";
import { useFrame, UseFrameOptions } from "@/components/Frame/hooks/useFrame";
import { useLayerValue } from "@/shared/hooks/useLayerValue";
import { useNormalizeLayer } from "@/shared/hooks/useNormalizeLayer";
import { pick } from "@fragmentsx/utils";

export const useCollection = (layerKey: LinkKey, options?: UseFrameOptions) => {
  const { manager: fragmentManager } = useContext(FragmentContext);

  const frame = useFrame(layerKey, options);
  const children = useLayerChildren(layerKey, fragmentManager);
  const [collectionLayer] = useGraph(fragmentManager, layerKey, {
    selector: (graph) => pick(graph, "source"),
  });
  const source = collectionLayer?.source;
  const sourceDefinition = fragmentManager?.resolve(source)?.definition;

  const [sourceValue] = useLayerValue(layerKey, "source", fragmentManager);

  return {
    source,
    sourceDefinition,
    sourceValue: sourceValue ?? [],
    fragmentManager,
    children,
    ...frame,
  };
};
