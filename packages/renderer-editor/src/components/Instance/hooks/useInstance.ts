import { use, useContext, useMemo } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useLayerStyles } from "@/shared/hooks/useLayerStyles/useLayerStyles.ts";
import { useGraph } from "@graph-state/react";

export const useInstance = (layerKey: string) => {
  const { manager: fragmentManager } = use(FragmentContext);
  const [instanceLayer] = useGraph(fragmentManager, layerKey);
  const styles = useLayerStyles(layerKey);
  // useInstanceProperties(fragmentManager, layerKey);

  return {
    manager: fragmentManager,
    styles,
    fragmentId: instanceLayer?.fragment,
  };
};
