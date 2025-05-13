import { useContext, useEffect } from "preact/compat";
import { GraphState, LinkKey } from "@graph-state/core";
import { useGraph } from "@graph-state/react";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { pick } from "@fragmentsx/utils";

export const useLayerChildren = (
  layerKey: LinkKey,
  customManager?: GraphState
) => {
  const { manager: fragmentManager } = useContext(FragmentContext);
  const [layerData] = useGraph(customManager ?? fragmentManager, layerKey, {
    selector: (data) => pick(data, "children"),
  });

  return layerData?.children ?? [];
};
