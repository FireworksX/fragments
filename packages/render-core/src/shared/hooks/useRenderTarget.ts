import { GraphState } from "@graph-state/core";
import { renderTarget } from "@/definitions";
import { useGlobalManager } from "@/shared/hooks/useGlobalManager";

export const useRenderTarget = (globalManager?: GraphState) => {
  const { globalManagerGraph, setRenderTarget } =
    useGlobalManager(globalManager);

  const renderTargetValue =
    globalManagerGraph?.renderTarget ?? renderTarget.document;

  // Subscribe to root fragment
  // useGraph(documentManager, documentManager.$fragment.root);

  return {
    renderTarget: renderTargetValue,
    isCanvas: renderTargetValue === renderTarget.canvas,
    isDocument: renderTargetValue === renderTarget.document,
    setRenderTarget: (target) => {
      setRenderTarget(target);
    },
  };
};
