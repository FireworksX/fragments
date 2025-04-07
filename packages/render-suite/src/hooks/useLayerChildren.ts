import { GraphState, LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { useContext } from "react";

export const useLayerChildren = (
  layerKey: LinkKey,
  customManager?: GraphState
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [layerData] = useGraph(customManager ?? fragmentManager, layerKey);

  return layerData?.children ?? [];
};
