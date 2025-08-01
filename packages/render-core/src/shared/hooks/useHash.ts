import { GraphState, LinkKey } from "@graph-state/core";
import { useContext } from "preact/compat";
import { FragmentContext } from "@/components/Fragment/FragmentContext";
import { getKey } from "@/shared/helpers/keys";
import { hashGenerator } from "@fragmentsx/utils";

export const useHash = (layerKey: LinkKey, manager: GraphState) => {
  if (!layerKey || !manager) return null;

  const layer = manager.resolve(layerKey);
  const overrideFrom = getKey(layer?.overrideFrom);
  return hashGenerator(overrideFrom ?? layerKey);
};
