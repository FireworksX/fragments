import { GraphState, LinkKey } from "@graph-state/core";
import { useContext } from "react";
import { FragmentContext } from "@/components/Fragment/FragmentContext.tsx";
import { useGraph } from "@graph-state/react";

export const useLayerChildren = (
  layerKey: LinkKey,
  customManager?: GraphState
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [layerData] = useGraph(customManager ?? fragmentManager, layerKey);

  return layerData?.children ?? [];
};
