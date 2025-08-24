import { ElementType, useContext, useMemo } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles";
import { useLayerChildren } from "@/shared/hooks/useLayerChildren";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useGraph } from "@graph-state/react";

export const useCollection = (layerKey: LinkKey) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const children = useLayerChildren(layerKey);
  const [collectionGraph] = useGraph(fragmentManager, layerKey);
  const properties = collectionGraph?.properties ?? [];

  return {
    fragmentManager,
    children,
    properties,
  };
};
